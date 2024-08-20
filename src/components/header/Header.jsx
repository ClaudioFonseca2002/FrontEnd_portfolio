//Importo estilo
import "./Header.css";
//Importo iconos
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
//Importo Dependencias
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Header = (props) => {
  //Tomo el token si aún existe
  const [userIsLogged, setUserIsLogged] = useState(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      // Verifica si el cambio es relevante
      if (event.key === "token") {
        setUserIsLogged(localStorage.getItem("token"));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="social-icons">
          <a href="https://github.com/ClaudioFonseca2002" target="_blank">
            <FaGithub size={40} />
          </a>
          <a
            href="https://www.linkedin.com/in/claudio-rom%C3%A1n-fonseca-551785313/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={32} />
          </a>
        </div>
        {userIsLogged ? (
          <button type="button" className="btn btn-danger">
            Salir
          </button>
        ) : (
          <Link to="/login">
            <button type="button" className="btn btn-primary">
              Ingresar
            </button>
          </Link>
        )}
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Contacto
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Proyectos
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
