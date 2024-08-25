import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Technology.css";
import { useAuth } from '../../utils/AuthContext.jsx';

const Technology = () => {
  //Estado
  const [technology, setTechnology] = useState([]);

  //contexto
  const { isAuthenticated } = useAuth();

  //Variables de entorno
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;

  //Traer tecnologias
  useEffect(() => {
    axios
      .get(`${LOCAL_BACKEND}/getTechnology`)
      .then((response) => {
        setTechnology(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, [technology]);

  // Función para eliminar una tecnología
  const handleDelete = async (idTechnology) => {
    const confirmed = window.confirm(
      "¿Estás seguro que quieres eliminar tecnología?"
    );

    if (confirmed) {
      // Obtener el token del almacenamiento local
      const token = localStorage.getItem("token");

      try {
        await axios.delete(
          `${LOCAL_BACKEND}/deleteTechnology/${idTechnology}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Incluir el token en el encabezado Authorization
            },
          }
        );

        // Eliminar el registro de la lista después de confirmar la eliminación
        setTechnology(
          technology.filter((tech) => tech.idTechnology !== idTechnology)
        );
        alert("Tecnología eliminada correctamente");
      } catch (error) {
        console.error("Error al eliminar el registro:", error);
        alert("Error al eliminar el registro");
      }
    }
  };

  return (
    <div className="container_technology">
      <h2>Técnologias</h2>
      <br></br>
      {isAuthenticated ? (
        <Link to="/addTechnology">
          <button type="button" className="btn btn-warning">
            Agregar
          </button>
          <br></br>
          <br></br>
        </Link>
      ) : (
        <></>
      )}
      <ul>
        {technology.map((technology) => (
          <li key={technology.id_tecnologia} className="container_item">
            <p className="name_technology">{technology.nombre_tecnologia}</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${technology.porcentaje}%` }}
              ></div>
            </div>
            <span>{technology.porcentaje}%</span>
            {isAuthenticated ? (
              <button
                type="button"
                className="btn btn-danger button_delete"
                onClick={() => handleDelete(technology.id_tecnologia)}
              >
                Borrar
              </button>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Technology;
