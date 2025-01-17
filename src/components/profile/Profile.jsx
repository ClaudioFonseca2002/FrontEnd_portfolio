import "./Profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import roman from "../../img/roman.jpeg";
import { useAuth } from '../../utils/AuthContext.jsx';

const Profile = () => {
  //Estados
  const [profileDescription, setProfileDescription] = useState([]);
  const id_profile = 1;
  
  //contexto
  const { isAuthenticated } = useAuth();

  //VariablesDeEntorno
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;

  //Traer descripcion del perfil desde la base de datos
  useEffect(() => {
    const fecthProfileDescription = async () => {
      try {
        const res = await axios.get(`${backendUrl}/profile`);
        setProfileDescription(res.data);
      } catch (err) {
        //console.log(err);
      }
    };
    fecthProfileDescription();
  }, []);

  //Vista componente

  return (
    <div className="container_perfil">
      <div className="container_title">
        <h2>Perfil</h2>
      </div>
      <div className="container_img_text">
        <img src={roman} alt="Profile" className="img" />
        <div className="description-container">
          <ul>
            {profileDescription.map((profile) => (
              <li key={profile.id_perfil}>
                <p className="description-text">{profile.perfil_descripcion}</p>
              </li>
            ))}
          </ul>
          {isAuthenticated && (
            <Link to="/modifyProfile">
              <button type="button" className="btn btn-warning editButton">
                Editar
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
