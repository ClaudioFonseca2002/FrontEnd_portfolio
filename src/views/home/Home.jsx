import "./Home.css";
import Header from "../../components/header/Header";
import Profile from "../../components/profile/Profile.jsx";
import Proyect from "../../components/proyect/Proyect.jsx";
import { jwtDecode } from "jwt-decode";
import Education from "../../components/education/Education.jsx";
import Technology from "../../components/technology/Technology.jsx";
import Footer from "../../components/footer/Footer.jsx";
import { useAuth } from "../../utils/AuthContext.jsx";
import { useEffect, useState } from "react";

const Home = () => {

  const [token, setToken] = useState("");

  //Contexto
  const { logout } = useAuth();

  useEffect(() => {
    return () => {
      if (localStorage.getItem("token")) {
        //Guardo el token en un estado
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);

        // Decodificar el token para obtener la fecha de expiración
        const decodedToken = jwtDecode(storedToken);
        const expirationTime = decodedToken.exp * 1000; // Convertir a milisegundos

        // Calcular cuánto tiempo queda antes de que expire el token
        const currentTime = new Date().getTime();
        const timeUntilExpiration = (expirationTime - currentTime) / 1000;

        if (currentTime > expirationTime) {
          // El token ha expirado, eliminarlo del almacenamiento
          localStorage.removeItem("token");
          logout();
        } 
      }
    };
  }, []); // Arreglo de dependencias vacío: se ejecuta solo una vez

  return (
    <>
      <Header></Header>
      <Profile></Profile>
      <Education></Education>
      <Proyect></Proyect>
      <Technology></Technology>
      <Footer></Footer>
    </>
  );
};
export default Home;
