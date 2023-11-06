import { useEffect, useState } from "react";
import SmallCard from "../SmallCard/SmallCard";
import "./Favorites.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [userFavorites, setUserFavorites] = useState([]);

  let userData = {
    name: "Niklas",
    favorites: [53013, 52831, 53065, 52896],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoritesData = [];
        for (let i = 0; i < userData.favorites.length; i++) {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${userData.favorites[i]}`
          );
          favoritesData.push(response.data.meals[0]);
        }
        setUserFavorites(favoritesData);
      } catch (error) {
        console.error("Fehler bei der Anfrage:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="favorites-section">
        <h3>Favorites</h3>
      </section>
      <article className="favorites-gallery">
        {userFavorites?.map((item, index) => (
          <div key={index}>
            <Link to={`/${item.idMeal}`}>
              <SmallCard title={item.strMeal} img={item.strMealThumb} />
            </Link>
          </div>
        ))}
      </article>
    </>
  );
};

export default Favorites;
