import { useState } from "react";
import style from "./EditProfile.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const EditProfile = () => {
  //Estados
  const [newDescription, setNewDescription] = useState("");
  const [id_profile, setIdProfile] = useState(1);
  const [error, setError] = useState("");

  //Variables de entorno
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;

  //Navigate
  const navigate = useNavigate();

  //Función de flecha para controlar los cambios del input 'textArea'
  const handleNewDescription = (e) => {
    //Tomo los datos
    const value = e.target.value;
    setNewDescription(value);
    console.log("New description:", value);

    //Comparo longitud
    if (value.length > 1300) {
      setError("El campo no puede exceder los 1300 caracteres");
    } else if (value.length < 20) {
      setError("El campo debe tener 20 carácteres como minimo");
    } else {
      setError("");
    }
  };

  const updateDescription = async (element) => {
    element.preventDefault();

    if (newDescription.length > 1300) {
      setError("El campo no puede exceder los 1300 caracteres");
    } else if (newDescription.length < 20) {
      setError("El campo debe tener como mínimo 20 caracteres");
    } else {
      // Obtener el token del almacenamiento local
      const token = localStorage.getItem("token");

      try {
        await axios.put(
          `http://${LOCAL_BACKEND}/modifyDescription/${id_profile}`,
          { newDescription },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Incluir el token en el encabezado Authorization
              "Content-Type": "application/json", // Asegúrate de que el tipo de contenido sea JSON
            },
          }
        );
        alert("Dato actualizado correctamente");
        navigate("/"); // Redirecciona a la vista "/home"
      } catch (error) {
        console.error("Error al actualizar el dato:", error);
        alert("Error al actualizar el dato");
      }
      setError("");
    }
  };

  return (
    <div className={style.body}>
      <div className={style.modify_container}>
        <h2 className={style.title}>Modificar perfil</h2>
        <form onSubmit={updateDescription}>
          <div className={style.formGroup}>
            <label htmlFor="username" className={style.label}>
              Nueva descripción:
            </label>
            <textarea
              type="text"
              id="descripcion"
              name="descripcion"
              maxLength={1300}
              className={style.expanding_textarea}
              onChange={handleNewDescription}
              required
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p className={style.legend}>
              Minimo carácteres: 20 -- Maximo carácteres: 500
            </p>
          </div>
          <button type="submit" className={style.btnSave}>
            Guardar
          </button>
          <Link to="/">
            <button type="submit" className={style.btnCancel}>
              Cancelar
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
