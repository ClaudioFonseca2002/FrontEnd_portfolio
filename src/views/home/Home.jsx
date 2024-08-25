import "./Home.css";
import Header from "../../components/header/Header";
import Profile from "../../components/profile/Profile.jsx"
import Proyect from "../../components/proyect/Proyect.jsx"
import Status from "../../components/status/Status.jsx";
import Education from "../../components/education/Education.jsx";
import Technology from "../../components/technology/Technology.jsx";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Profile></Profile>
      <Education></Education>
      <Proyect></Proyect>
      <Technology></Technology>
      <Status></Status>
    </>
  );
};
export default Home;
