import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./AddProyect.module.css";
import { useNavigate } from "react-router-dom";

const AddProyect = () => {
  //Estados de campos
  const [nameProyect, setNameProyect] = useState([]);
  const [description, setDescription] = useState([]);
  const [link, setLink] = useState([]);

  //Navegacion
  const navigate = useNavigate();

  //Variables de entorno
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;

  //Mensajes de error
  const [proyectError, setProyectError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [linkError, setlinkError] = useState("");

  //Manejo de campos
  const handleNameProyect = (e) => {
    const value = e.target.value;
    setNameProyect(value);
    if (value.length >= 60) {
      setProyectError("El campo no puede exceder los 60 caracteres");
    } else if (value.length < 4) {
      setProyectError("El campo debe tener 4 carácteres como minimo");
    } else {
      setProyectError("");
    }
  };

  const handleDescription = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (value.length >= 500) {
      setDescriptionError("El campo no puede exceder los 500 caracteres");
    } else if (value.length < 4) {
      setDescriptionError("El campo debe tener 30 carácteres como minimo");
    } else {
      setDescriptionError("");
    }
  };

  const handleLink = (e) => {
    const value = e.target.value;
    setLink(value);
    if (value.length >= 300) {
      setlinkError("El campo no puede exceder los 300 caracteres");
    } else if (value.length < 4) {
      setlinkError("El campo debe tener 30 carácteres como minimo");
    } else {
      setlinkError("");
    }
  };

  //Manejar envio
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nameProyect,
      description,
      link,
    };

    // Obtener el token del almacenamiento local
    const token = localStorage.getItem("token");

    try {
      await axios.post(`${LOCAL_BACKEND}/addProyect`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en el encabezado Authorization
          "Content-Type": "application/json", // Asegúrate de que el tipo de contenido sea JSON
        },
      });
      alert("Proyecto guardado correctamente");
      // Lógica adicional después de agregar el registro
      navigate("/");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert("Error al guardar los datos");
    }
  };

  //JSX
  return (
    <div className={style.body}>
      <div className={style.add_container}>
        <h2 className={style.title}>Agregar Proyecto</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="Proyecto" className={style.label}>
              Proyecto:
            </label>
            <input
              type="text"
              id="proyecto"
              name="proyecto"
              maxLength={40}
              onChange={handleNameProyect}
              required
            />
            {proyectError && <p style={{ color: "red" }}>{proyectError}</p>}
            <label htmlFor="descripcion" className={style.label}>
              Descripción:
            </label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              maxLength={300}
              onChange={handleDescription}
              required
            />
            {descriptionError && (
              <p style={{ color: "red" }}>{descriptionError}</p>
            )}
            <label htmlFor="enlace" className={style.label}>
              Repositorio:
            </label>
            <input
              type="text"
              id="enlace"
              name="enlace"
              maxLength={100}
              onChange={handleLink}
              required
            />
          </div>
          {linkError && <p style={{ color: "red" }}>{linkError}</p>}
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

export default AddProyect;
