//Importo Vistas
import AddEducation from "./views/addEducation/AddEducation.jsx";
import AddProyect from "./views/addProyect/AddProyect.jsx";
import AddTechnology from "./views/addTechnology/AddTechnology.jsx";
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
      <Route path="/addEducation" element={<AddEducation></AddEducation>} />
      <Route path="/addProyect" element={<AddProyect></AddProyect>} />
      <Route path="/addTechnology" element={<AddTechnology></AddTechnology>} />
    </Routes>
  );
}

export default App;
