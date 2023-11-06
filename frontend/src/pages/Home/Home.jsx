import Areas from "../../components/Areas/Areas";
import Categories from "../../components/Categories/Categories";
import Favorites from "../../components/Favorites/Favorites";
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
        <Areas />
        <Categories />
        <Favorites />
      </section>
      <NavBar />
    </>
  );
};

export default Home;
