import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./SearchPage.css";
import { AreaContext, SearchInputContext } from "../../context/Context";
import Areas from "../../components/Areas/Areas";
import axios from "axios";
import SmallCard from "../../components/SmallCard/SmallCard";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const { searchInput, setSearchInput } = useContext(SearchInputContext);
  const { area, setArea } = useContext(AreaContext);
  const [mealData, setMealData] = useState([]);

  const filteredData = mealData.filter((item) =>
    item.strMeal.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then((res) => {
        setMealData(res.data.meals);
        console.log(res.data.meals);
      })
      .catch((error) => {
        console.error("Fehler bei der Anfrage:", error);
      });
  }, [area]);

  return (
    <>
      <SearchBar />
      <Areas />
      <section className="searchpage-section">
        {filteredData?.map((item, index) => (
          <Link to={`/${item.idMeal}`} key={index}>
            <SmallCard title={item.strMeal} img={item.strMealThumb} />
          </Link>
        ))}
      </section>
      <NavBar />
    </>
  );
};

export default SearchPage;
