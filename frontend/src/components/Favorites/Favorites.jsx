import { useEffect, useState } from "react";
import SmallCard from "../SmallCard/SmallCard";
import "./Favorites.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [userFavorites, setUserFavorites] = useState([]);
  const [loggedUser, setLoggedUser] = useState({ favorites: [] });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/user/profile`);
        setLoggedUser(data);
      } catch (error) {
        console.error("Fehler beim Laden des Users:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loggedUser && loggedUser.favorites.length >= 0) {
          const favoritesData = await Promise.all(
            loggedUser.favorites.map(async (favorite) => {
              const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favorite}`
              );
              return response.data.meals[0];
            })
          );
          setUserFavorites(favoritesData);
        }
      } catch (error) {
        console.error("Fehler bei der Anfrage:", error);
      }
    };
    fetchData();
  }, [loggedUser]);

  return (
    <>
      <section className="favorites-section">
        <h3>Favoriten</h3>
      </section>
      <article className="favorites-gallery">
        {userFavorites ? (
          <>
            {userFavorites.map((item, index) => (
              <div key={index}>
                <Link to={`/${item.idMeal}`}>
                  <SmallCard title={item.strMeal} img={item.strMealThumb} />
                </Link>
              </div>
            ))}
          </>
        ) : (
          <span class="loader"></span>
        )}
      </article>
    </>
  );
};

export default Favorites;
