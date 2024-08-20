import "./Header.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = (props) => {
  const [userIsLogged, setUserIsLogged] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        setUserIsLogged(localStorage.getItem("token"));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    //Actualiza el estado en caso de que el componente se monte
    setUserIsLogged(localStorage.getItem("token"));
  }, []);

  const logOut = () => {
    const confirmed = window.confirm("¿Estás seguro que quieres cerrar sesión?");
    if (confirmed) {
      localStorage.removeItem("token");
      setUserIsLogged(null); // Actualiza el estado en la misma pestaña
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="social-icons">
          <a href="https://github.com/ClaudioFonseca2002" target="_blank" rel="noopener noreferrer">
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
          <button type="button" className="btn btn-danger" onClick={logOut}>
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