//Importo Vistas
import EditProfile from "./views/editProfile/EditProfile.jsx";
import Home from "./views/home/Home.jsx";
import Login from "./views/login/Login.jsx";
//Importo dependencias
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/modifyProfile" element={<EditProfile></EditProfile>} />
      <Route path="/addEducation" element={<EditProfile></EditProfile>} />
    </Routes>
  );
}

export default App;
