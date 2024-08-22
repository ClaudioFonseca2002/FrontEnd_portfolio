import "./Education.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from '../../utils/AuthContext.jsx';

const Education = () => {

  //Estados
  const [completedEducations, setCompletedEducations] = useState([]);
  const [educationsInProcess, setEducationsInProcess] = useState([]);

  //Variables de entorno

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;

  //contexto
  const { isAuthenticated } = useAuth();

  //Traer datos de educación finalizada
  useEffect(() => {
    axios
      .get(`${LOCAL_BACKEND}/getCompletedEducation`)
      .then((response) => {
        setCompletedEducations(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, [completedEducations]);

  //Traer datos de educación en proceso
  useEffect(() => {
    axios
      .get(`${LOCAL_BACKEND}/getEducationInProcess`)
      .then((response) => {
        setEducationsInProcess(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  // Función para eliminar educación finalizada
  const handleDeleteEduFin = async (id_education) => {
    const confirmed = window.confirm(
      "¿Estás seguro que quieres eliminar educación?"
    );

    if (confirmed) {
      // Obtener el token del almacenamiento local
      const token = localStorage.getItem("token");

      try {
        await axios.delete(
          `${LOCAL_BACKEND}/deleteCompletedEducation/${id_education}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Incluir el token en el encabezado Authorization
            },
          }
        );

        // Eliminar el registro de la lista después de confirmar la eliminación
        setCompletedEducations(
          completedEducations.filter(
            (education) => education.id_education !== id_education
          )
        );
        alert("Registro eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar el registro:", error);
        alert("Error al eliminar el registro");
      }
    }
  };

  // Función para eliminar educación en proceso
  const handleDeleteEduProceso = async (id_educacion_proceso) => {
    const confirmed = window.confirm(
      "¿Estás seguro que quieres eliminar educación en proceso?"
    );

    if (confirmed) {
      // Obtener el token del almacenamiento local
      const token = localStorage.getItem("token");

      try {
        await axios.delete(
          `${LOCAL_BACKEND}/deleteEducationInProcess/${id_educacion_proceso}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Incluir el token en el encabezado Authorization
            },
          }
        );

        // Eliminar el registro de la lista después de confirmar la eliminación
        setEducationsInProcess(
          educationsInProcess.filter(
            (education) =>
              education.id_educacion_proceso !== id_educacion_proceso
          )
        );
        alert("Registro eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar el registro:", error);
        alert("Error al eliminar el registro");
      }
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Puedes usar otros métodos de formato aquí según tus necesidades
  };
  
  return (
    <div className="contenedor_educacion">
      <h2>Educación</h2>
      {isAuthenticated ? (
        <Link to="/addEducation">
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
        {completedEducations.map((completedEducations) => (
          <li key={completedEducations.id_educacion} className="container_item">
            <p className="nombre_educacion">
              {completedEducations.nombreEducacion}
            </p>
            <p>Institución: {completedEducations.institucion}</p>
            <p>Fecha Finalización: {formatDate(completedEducations.hasta)}</p>
            {isAuthenticated ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() =>
                  handleDeleteEduFin(completedEducations.id_educacion)
                }
              >
                Borrar
              </button>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
      <ul>
        {educationsInProcess.map((educationsInProcess) => (
          <li
            key={educationsInProcess.id_educacion_proceso}
            className="container_item"
          >
            <p className="nombre_educacion">
              {educationsInProcess.nombreEducacion}
            </p>
            <p>Institución: {educationsInProcess.institucion}</p>
            <p>Fecha inicio: {formatDate(educationsInProcess.inicio)}</p>
            <p>En Proceso</p>
            {isAuthenticated ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() =>
                  handleDeleteEduProceso(
                    educationsInProcess.id_educacion_proceso
                  )
                }
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

export default Education;
