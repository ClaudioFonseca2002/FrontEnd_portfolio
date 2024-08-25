import React from "react";
import "./Footer.css"; // Archivo CSS para estilos específicos del footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="logo">
            {/* Aquí podrías colocar tu logo si tienes uno */}
            Portfolio Web
          </h2>
          <p>
            Está aplicación está pensada para compartir acerca de mí y de mi
            formación. Creado para poner en practica distintas técnologias NODE
            JS / MYSQL / JSONWEBTOKEN / EXPRESS / REACT / JAVASCRIPT / CSS /
            HTML
          </p>
        </div>

        <div className="footer-section links">
          <h2> Correo electrónico</h2>
          <div className="contact">
            <span>
              <i className="fas fa-envelope">romanfonseca650@gmail.com</i>{" "}
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Portfolio Web
      </div>
    </footer>
  );
};

export default Footer;
