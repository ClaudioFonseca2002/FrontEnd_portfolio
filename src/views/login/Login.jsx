//Importo Estilos
import styles from "./Login.module.css";
//Importo dependencias
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../../utils/AuthContext.jsx';
import { useNavigate } from "react-router-dom";


const Login = () => {
  //Estados
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores
  const navigate = useNavigate();
  const { login } = useAuth();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;
 

  //Manejo de campos
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores
  
    // Validar campos de entrada
    if (!username || !password) {
      setError("Por favor, ingresa tu nombre de usuario y contraseña.");
      return;
    }
  
    const data = { username, password };
  
    try {
      const response = await fetch(`${LOCAL_BACKEND}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        // Intentar obtener un mensaje de error del backend
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      localStorage.setItem("token", result.token);
      login();
      navigate("/"); // Redirecciona a la vista "/"
    } catch (error) {
      //console.error("Error al autenticar:", error);
      setError(error.message || "Error al autenticar. Inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.login_container}>
        <h2 className={styles.titulo}>Login</h2>
        {error && <p className={styles.error}>{error}</p>}{" "}
        {/* Mostrar errores */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className={styles.etiqueta}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleUsername}
              value={username} // Añadir valor para controlado
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className={styles.etiqueta}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlePassword}
              value={password} // Añadir valor para controlado
              required
            />
          </div>
          <button type="submit" className={styles.btnIngresar}>
            Ingresar
          </button>
          <Link to="/">
            <button type="button" className={styles.btnVolver}>
              Volver
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
