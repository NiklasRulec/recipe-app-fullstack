import { useParams } from "react-router-dom";
import "./DetailsPage.css";
import { useContext, useEffect, useState } from "react";
import { RefreshContext } from "../../context/Context";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import heartblack from "../../assets/img/heart-icon-black.svg";
import heartpurple from "../../assets/img/heart-icon-purple.svg";

const DetailsPage = () => {
  const params = useParams();
  const { refresh, setRefresh } = useContext(RefreshContext);
  const [mealData, setMealData] = useState("");
  const [selectedButton, setSelectedButton] = useState(true);
  const [isFavorited, setIsFavorited] = useState();

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`)
      .then((res) => {
        setMealData(res.data.meals[0]);
      })
      .catch((error) => {
        console.error("Fehler bei der Anfrage:", error);
      });
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get("/api/user/profile");
        setIsFavorited(userData.data.favorites.includes(Number(params.id)));
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerfavoriten:", error);
      }
    };
    fetchData();
  }, []);

  const handleFavoriteClick = async () => {
    try {
      const userData = await axios.get("/api/user/profile");
      const userEmail = userData.data.email;
      const requestData = {
        email: userEmail,
        idMeal: mealData.idMeal,
      };
      await axios.put("/api/user/profile", requestData);
      // Aktualisierung des Favoritenstatus nach dem Klick auf das Herzsymbol
      setRefresh((prev) => !prev); // Dadurch wird ein Refresh ausgelöst
      const updatedUserData = await axios.get("/api/user/profile");
      setIsFavorited(
        updatedUserData.data.favorites.includes(Number(params.id))
      ); // Aktualisiere den Favoritenstatus
      console.log("Favoriten erfolgreich aktualisiert");
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Favoriten:", error);
    }
  };

  const handleButtonClick = (value) => {
    setSelectedButton(value);
  };

  return (
    <>
      {mealData ? (
        <>
          <img
            src={mealData.strMealThumb}
            alt={mealData.strMeal}
            className="detailspage-background"
          />
          <section className="detailspage-section">
            <article className="meal-details">
              <div className="meal-details-top">
                <h3>{mealData.strMeal}</h3>
                <img
                  src={isFavorited ? heartpurple : heartblack}
                  alt="heart-icon"
                  onClick={handleFavoriteClick}
                  className="heart-icon"
                />
              </div>
              <h4>{mealData.strCategory}</h4>
              <p>{mealData.strArea}</p>
              <div className="meal-details-buttons">
                <button
                  className={selectedButton ? "selected" : ""}
                  onClick={() => handleButtonClick(true)}
                >
                  Zutaten
                </button>
                <button
                  className={!selectedButton ? "selected" : ""}
                  onClick={() => handleButtonClick(false)}
                >
                  Anweisungen
                </button>
              </div>
              <div className="meal-details-text">
                {selectedButton ? (
                  <>
                    {mealData.strIngredient1 &&
                    mealData.strIngredient1.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure1} {mealData.strIngredient1}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient2 &&
                    mealData.strIngredient2.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure2} {mealData.strIngredient2}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient3 &&
                    mealData.strIngredient3.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure3} {mealData.strIngredient3}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient4 &&
                    mealData.strIngredient4.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure4} {mealData.strIngredient4}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient5 &&
                    mealData.strIngredient5.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure5} {mealData.strIngredient5}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient6 &&
                    mealData.strIngredient6.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure6} {mealData.strIngredient6}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient7 &&
                    mealData.strIngredient7.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure7} {mealData.strIngredient7}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient8 &&
                    mealData.strIngredient8.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure8} {mealData.strIngredient8}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient9 &&
                    mealData.strIngredient9.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure9} {mealData.strIngredient9}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient10 &&
                    mealData.strIngredient10.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure10} {mealData.strIngredient10}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient11 &&
                    mealData.strIngredient11.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure11} {mealData.strIngredient11}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient12 &&
                    mealData.strIngredient12.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure12} {mealData.strIngredient12}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient13 &&
                    mealData.strIngredient13.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure13} {mealData.strIngredient13}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strIngredient14 &&
                    mealData.strIngredient14.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure14} {mealData.strIngredient14}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strMeasure15 &&
                    mealData.strIngredient15.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure15} {mealData.strIngredient15}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strMeasure16 &&
                    mealData.strIngredient16.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure16} {mealData.strIngredient16}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strMeasure17 &&
                    mealData.strIngredient17.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure17} {mealData.strIngredient17}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strMeasure18 &&
                    mealData.strIngredient18.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure18} {mealData.strIngredient18}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strMeasure19 &&
                    mealData.strIngredient19.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure19} {mealData.strIngredient19}
                      </h4>
                    ) : (
                      <></>
                    )}
                    {mealData.strMeasure20 &&
                    mealData.strIngredient20.length >= 3 ? (
                      <h4>
                        {mealData.strMeasure20} {mealData.strIngredient20}
                      </h4>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <p>{mealData.strInstructions}</p>
                  </>
                )}
              </div>
            </article>
          </section>
        </>
      ) : (
        <></>
      )}
      <NavBar />
    </>
  );
};

export default DetailsPage;
