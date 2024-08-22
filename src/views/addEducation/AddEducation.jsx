import { useContext, useState } from "react";
import style from "./AddEducation.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddEducation = () => {
  //Estados
  const [educationName, setEducationName] = useState("");
  const [institution, setInstitution] = useState("");
  const [until, setUntil] = useState("");
  const [start, setStart] = useState("");
  const [state, setState] = useState("finalizado");

  //Variables de entorno
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;

  //Navegacion
  const navigate = useNavigate();

  //Mensajes de error
  const [errorName, setErrorName] = useState("");
  const [errorInstitution, setInstitutionError] = useState("");

  //Manejo de campos
  const handleEducationName = (e) => {
    const value = e.target.value;
    setEducationName(value);
    if (value.length > 70) {
      setErrorName("El campo no puede exceder los 70 caracteres");
    } else if (value.length < 4) {
      setErrorName("El campo debe tener 4 carácteres como minimo");
    } else {
      setErrorName("");
    }
  };

  const handleInstitution = (e) => {
    const value = e.target.value;
    setInstitution(value);
    if (value.length > 80) {
      setInstitutionError("El campo no puede exceder los 80 caracteres");
    } else if (value.length < 4) {
      setInstitutionError("El campo debe tener 4 carácteres como minimo");
    } else {
      setInstitutionError("");
    }
  };

  const handleStart = (e) => {
    const value = e.target.value;
    setStart(value);
    //console.log("Inicio:", value);
  };
  const handleUntil = (e) => {
    const value = e.target.value;
    setUntil(value);
    //console.log("Hasta:", value);
  };

  const handleOption = (event) => {
    setState(event.target.value); // Actualiza el estado cuando se selecciona una opción
  };

  //Manejar envio
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Consigo token
    const token = localStorage.getItem("token");

    //Informacion ingresada por el usuario para enviar en la solicitud
    const completedEducation = {
      educationName,
      institution,
      until,
    };

    //Informacion ingresada por el usuario para enviar en la solicitud
    const inProcessEducation = {
      educationName,
      institution,
      start,
    };

    if (state === "finalizado") {
      try {
        axios.post(
          `${LOCAL_BACKEND}/addCompletedEducation`,
          completedEducation,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Incluir el token en el encabezado Authorization
              "Content-Type": "application/json", // Asegúrate de que el tipo de contenido sea JSON
            },
          }
        );
        alert("Datos guardados correctamente");
        // Lógica adicional después de agregar el registro
        navigate("/");
      } catch (error) {
        console.error("Error al guardar los datos:", error);
        alert("Error al guardar los datos");
      }
    } else {
      try {
        axios.post(
          `${LOCAL_BACKEND}/addInProcessEducation`,
          inProcessEducation,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Incluir el token en el encabezado Authorization
              "Content-Type": "application/json", // Asegúrate de que el tipo de contenido sea JSON
            },
          }
        );
        alert("Datos guardados correctamente");
        // Lógica adicional después de agregar el registro
        navigate("/"); // Redirecciona a la vista "/home"
      } catch (error) {
        console.error("Error al guardar los datos:", error);
        alert("Error al guardar los datos");
      }
    }
  };

  return (
    <div className={style.body}>
      <div className={style.add_container}>
        <h2 className={style.label}>Agregar Formación</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="education" className={style.label}>
              Formacion:
            </label>
            <input
              type="text"
              id="education"
              name="education"
              maxLength={70}
              onChange={handleEducationName}
              required
            />
            {errorName && <p style={{ color: "red" }}>{errorName}</p>}
            <label htmlFor="intitution" className={style.label}>
              Intitución:
            </label>
            <input
              type="text"
              id="intitution"
              name="intitution"
              maxLength={80}
              onChange={handleInstitution}
              required
            />
            {errorInstitution && (
              <p style={{ color: "red" }}>{errorInstitution}</p>
            )}
            <label className={style.lable}>
              <input
                type="radio"
                name="estado"
                value="finalizado"
                checked={state === "finalizado"}
                onChange={handleOption}
              />
              Finalizado
            </label>
            <label className={style.label}>
              <input
                type="radio"
                name="estado"
                value="proceso"
                checked={state === "proceso"}
                onChange={handleOption}
              />
              En proceso
            </label>
            {state === "finalizado" ? (
              <div className="form-group">
                <label htmlFor="until" className={style.label}>
                  Fecha finalización:
                </label>
                <input
                  type="date"
                  id="until"
                  name="until"
                  required
                  onChange={handleUntil}
                />
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="start" className={style.label}>
                  Fecha inicio:
                </label>
                <input
                  type="date"
                  id="start"
                  name="start"
                  required
                  onChange={handleStart}
                />
              </div>
            )}
          </div>
          <button type="submit" className={style.btnSave}>
            Guardar
          </button>
          <Link to="/">
            <button className={style.btnCancel}>Cancelar</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddEducation;
