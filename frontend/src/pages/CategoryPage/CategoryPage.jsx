import { useEffect, useState } from "react";
import "./CategoryPage.css";
import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import SmallCard from "../../components/SmallCard/SmallCard";
import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams();
  const [categoryMeals, setCategoryMeals] = useState([]);

  useEffect(() => {
    const fetchMealsByCategory = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        setCategoryMeals(response.data.meals);
      } catch (error) {
        console.error("Fehler beim Abrufen der Gerichte:", error);
      }
    };
    fetchMealsByCategory();
  }, [category]);

  return (
    <>
      <section className="categorypage-section">
        <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
      </section>
      <article className="categorypage-gallery">
        {categoryMeals?.map((item, index) => (
          <Link to={`/${item.idMeal}`} key={index}>
            <SmallCard title={item.strMeal} img={item.strMealThumb} />
          </Link>
        ))}
      </article>
      <NavBar />
    </>
  );
};

export default CategoryPage;
