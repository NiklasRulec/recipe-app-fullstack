import { useEffect, useState } from "react";
import "./Categories.css";
import axios from "axios";
import CategoryCard from "../CategoryCard/CategoryCard";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((error) => {
        console.error("Fehler bei der Anfrage:", error);
      });
  }, []);
  return (
    <>
      <section className="categories-section">
        <h3>Categories</h3>
      </section>
      <article className="categories-gallery">
        {categories?.map((item, index) => (
          <Link to={`/category/${item.strCategory.toLowerCase()}`} key={index}>
            <CategoryCard
              title={item.strCategory}
              img={item.strCategoryThumb}
              id={item.idCategory}
            />
          </Link>
        ))}
      </article>
    </>
  );
};

export default Categories;
