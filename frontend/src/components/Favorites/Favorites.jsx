import { useEffect, useState } from "react";
import SmallCard from "../SmallCard/SmallCard";
import "./Favorites.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [userFavorites, setUserFavorites] = useState([]);
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      setLoggedUser(data);
      console.log(data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoritesData = [];
        for (let i = 0; i < loggedUser.favorites.length; i++) {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${loggedUser.favorites[i]}`
          );
          favoritesData.push(response.data.meals[0]);
        }
        setUserFavorites(favoritesData);
      } catch (error) {
        console.error("Fehler bei der Anfrage:", error);
      }
    };

    fetchData();
  }, [loggedUser]);

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
