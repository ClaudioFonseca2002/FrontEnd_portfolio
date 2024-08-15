import Home from "./views/home/Home.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home></Home>} />
      </Routes>
    </>
  );
}

export default App;
