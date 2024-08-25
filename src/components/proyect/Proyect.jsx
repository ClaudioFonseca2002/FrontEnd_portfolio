import "./Proyect.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from '../../utils/AuthContext.jsx';

const Proyect = () => {
  const [proyects, setProyects] = useState([]);

  //Variables de entorno
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;

 //contexto
 const { isAuthenticated } = useAuth();

  //Traer datos de proyectos
  useEffect(() => {
    axios
      .get(`${backendUrl}/getProyects`)
      .then((response) => {
        setProyects(response.data);
      })
      .catch((error) => {
        //console.error("Error al obtener los datos:", error);
      });
  }, [proyects]);

  // Función para eliminar un proyecto
  const handleDelete = async (id_proyecto) => {
    const confirmed = window.confirm(
      "¿Estás seguro que quieres eliminar el proyecto?"
    );

    if (confirmed) {
      // Obtener el token del almacenamiento local
      const token = localStorage.getItem("token");

      try {
        await axios.delete(
          `${backendUrl}/deleteProyect/${id_proyecto}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Incluir el token en el encabezado Authorization
            },
          }
        );

        // Eliminar el registro de la lista después de confirmar la eliminación
        setProyects(
          proyects.filter((proyecto) => proyecto.id_proyecto !== id_proyecto)
        );
        alert("Proyecto eliminado correctamente");
      } catch (error) {
        //console.error("Error al eliminar el proyecto:", error);
        alert("Error al eliminar el proyecto");
      }
    }
  };

  return (
    <div className="contenedor_proyecto">
      <h2>Proyectos</h2>
      <br></br>
      {isAuthenticated ? (
        <Link to="/addProyect">
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
        {proyects.map((proyects) => (
          <li key={proyects.id_proyecto} className="container_item">
            <p className="proyect_name">{proyects.nombre_proyecto}</p>
            <p>Descripción: {proyects.descripcion}</p>
            <p>
              Repositorio "Enlace" :{" "}
              <a href={proyects.enlace} target="_blank">
                {proyects.enlace}
              </a>{" "}
            </p>
            {isAuthenticated ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(proyects.id_proyecto)}
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

export default Proyect;
