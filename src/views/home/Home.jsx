import "./Home.css";
import Header from "../../components/header/Header";
import Profile from "../../components/profile/Profile.jsx"
import Status from "../../components/status/Status.jsx";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Profile></Profile>
      <Status></Status>
    </>
  );
};
export default Home;
