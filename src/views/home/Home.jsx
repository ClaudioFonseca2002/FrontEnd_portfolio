import "./Home.css";
import Header from "../../components/header/Header";
import Profile from "../../components/profile/Profile.jsx"
import Status from "../../components/status/Status.jsx";
import Education from "../../components/education/Education.jsx";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Profile></Profile>
      <Education></Education>
      <Status></Status>
    </>
  );
};
export default Home;
