import axios from "axios";
import { useContext, useEffect } from "react";
import { AllMealContext } from "../../context/Context";

const AllMeals = () => {
  const { allMeals, setAllMeals } = useContext(AllMealContext);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => {
        const categories = res.data.categories.map(
          (category) => category.strCategory
        );
        fetchCategoriesData(categories);
      })
      .catch((error) => {
        console.error("Fehler bei der Anfrage:", error);
      });
  }, []);
  const fetchCategoriesData = async (categories) => {
    try {
      const mealsPromises = categories.map((category) =>
        axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        )
      );
      const mealsData = await Promise.all(mealsPromises);
      const meals = mealsData.map((response) => response.data.meals);
      const updatedMeals = [];
      meals.forEach((mealArray) => {
        mealArray.forEach((meal) => {
          updatedMeals.push(meal);
        });
      });
      setAllMeals(updatedMeals);
    } catch (error) {
      console.error("Fehler beim Sammeln der Daten:", error);
    }
  };

  // useEffect(() => {
  //   console.log(allMeals);
  // }, [allMeals]);
  return <></>;
};

export default AllMeals;
