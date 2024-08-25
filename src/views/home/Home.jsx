import "./Home.css";
import Header from "../../components/header/Header";
import Profile from "../../components/profile/Profile.jsx"
import Proyect from "../../components/proyect/Proyect.jsx"
import Status from "../../components/status/Status.jsx";
import Education from "../../components/education/Education.jsx";
import Technology from "../../components/technology/Technology.jsx";
import Footer from "../../components/footer/Footer.jsx";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Profile></Profile>
      <Education></Education>
      <Proyect></Proyect>
      <Technology></Technology>
      <Footer></Footer>
      <Status></Status>
    </>
  );
};
export default Home;
