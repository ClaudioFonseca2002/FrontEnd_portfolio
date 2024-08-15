//Importo Estilos
import styles from "./Login.module.css";
//Importo dependencias
import { Link } from "react-router-dom";
import { useState } from "react";


const Login = () => {
  //Estados
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores

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
    const data = {
      username,
      password,
    };
    console.log("Datos enviado correctamente");
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
