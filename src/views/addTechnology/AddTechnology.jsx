import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./AddTechnology.module.css";
import { useNavigate } from "react-router-dom";

const AddTechnology = () => {
  //Estados
  const [nameTechnology, setNameTechnology] = useState("");
  const [percentage, setPercentage] = useState(0);

  //Mensajes de error
  const [errorTechnology, setErrorTechnology] = useState("");

  //Variables de entorno
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;

  //Navegacion
  const navigate = useNavigate();

  //Manejo de campos
  const handleNameTechnology = (e) => {
    const value = e.target.value;
    setNameTechnology(value);
    if (value.length > 60) {
      setErrorTechnology("El campo no puede exceder los 60 caracteres");
    } else if (value.length < 2) {
      setErrorTechnology("El campo debe tener 2 carácteres como minimo");
    } else {
      setErrorTechnology("");
    }
  };

  const handlePercentage = (e) => {
    const value = e.target.value;
    if (value > 100) {
      e.target.value = 100;
    } else {
      setPercentage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nameTechnology,
      percentage,
    };

    // Obtener el token del almacenamiento local
    const token = localStorage.getItem("token");

    try {
      await axios.post(`${LOCAL_BACKEND}/addTechnology`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en el encabezado Authorization
          "Content-Type": "application/json", // Asegúrate de que el tipo de contenido sea JSON
        },
      });
      alert("Se ha guardado técnologia correctamente");
      navigate("/");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert("Error al guardar los datos");
    }
  };
  
  // Evita que se escriban caracteres
  const handleKeyDown = (event) => {
    event.preventDefault();
  };


  return (
    <div className={style.body}>
      <div className={style.add_container}>
        <h2 className={style.title}>Agregar Técnologia</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="technology" className={style.label}>
              Técnologia:
            </label>
            <input
              type="text"
              id="technology"
              name="technology"
              maxLength={40}
              onChange={handleNameTechnology}
              required
            />
            {errorTechnology && (
              <p style={{ color: "red" }}>{errorTechnology}</p>
            )}
            <label htmlFor="percentage" className={style.label}>
              Porcentaje:
            </label>
            <input
              type="number"
              id="percentage"
              name="percentage"
              min="0"
              max="100"
              onChange={handlePercentage}
              required
            />
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

export default AddTechnology;
