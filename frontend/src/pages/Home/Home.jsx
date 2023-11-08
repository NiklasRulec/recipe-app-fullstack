import Categories from "../../components/Categories/Categories";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import Motd from "../../components/Motd/Motd";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";

const Home = () => {
  return (
    <>
      <HeaderBar />
      <section className="home-section">
        <Motd />
        <Categories />
      </section>
      <NavBar />
    </>
  );
};

export default Home;
