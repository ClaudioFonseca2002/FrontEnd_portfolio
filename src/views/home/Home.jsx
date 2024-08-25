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
    const verifyToken = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          // Decodificar el token para obtener la fecha de expiración
          const decodedToken = jwtDecode(storedToken);
          const expirationTime = decodedToken.exp * 1000; // Convertir a milisegundos

          // Calcular cuánto tiempo queda antes de que expire el token
          const currentTime = new Date().getTime();
          if (currentTime > expirationTime) {
            // El token ha expirado, eliminarlo del almacenamiento
            localStorage.removeItem("token");
            logout();
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          localStorage.removeItem("token");
          logout();
        }
      } else {
        logout();
      }
    };

    verifyToken();
  }, [logout]); 

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
