import "./SearchBar.css";
import { SearchInputContext } from "../../context/Context";
import { useContext } from "react";

const SearchBar = () => {
  const { searchInput, setSearchInput } = useContext(SearchInputContext);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <section className="search-bar">
      <form>
        <input type="text" placeholder="Suchen" onChange={handleSearch} />
      </form>
    </section>
  );
};

export default SearchBar;
