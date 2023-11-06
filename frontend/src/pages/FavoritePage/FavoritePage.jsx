import Favorites from "../../components/Favorites/Favorites";
import NavBar from "../../components/NavBar/NavBar";
import "./FavoritePage.css";

const FavoritePage = () => {
  return (
    <>
      <section className="favoritepage-section">
        <Favorites />
      </section>
      <NavBar />
    </>
  );
};

export default FavoritePage;
