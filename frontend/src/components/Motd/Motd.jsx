import "./Motd.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Motd = () => {
  const [motd, setMotd] = useState("");

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => {
        setMotd(res.data.meals[0]);
      })
      .catch((error) => {
        console.error("Fehler bei der Anfrage:", error);
      });
  }, []);

  return (
    <section className="motd-section">
      <h3>Recipe recommendation</h3>
      {motd ? (
        <>
          <Link to={`/${motd.idMeal}`}>
            <article
              className="motd-card"
              style={{ backgroundImage: `url(${motd.strMealThumb})` }}
            >
              <div className="motd-card-background-overlay">
                <div className="motd-card-left">
                  <h4>{motd.strMeal}</h4>
                  <p>{motd.strCategory}</p>
                </div>
                <div className="motd-card-right">
                  <p>{motd.strArea}</p>
                </div>
              </div>
            </article>
          </Link>
        </>
      ) : (
        <p>Loading</p>
      )}
    </section>
  );
};

export default Motd;
