import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NavBar.css";
import FavoriteIcon from "../Icons/FavoriteIcon";
import HomeIcon from "../Icons/HomeIcon";
import SearchIcon from "../Icons/SearchIcon";
import UserIcon from "../Icons/UserIcon";

const NavBar = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollTop) {
        setShowNavBar(false);
      } else {
        setShowNavBar(true);
      }
      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <>
      {showNavBar ? (
        <nav>
          <div className="nav-links">
            <Link to="/">
              <HomeIcon fillColor="white" />
            </Link>
            <Link to="/search">
              <SearchIcon fillColor="white" />
            </Link>
            <Link to="/favorite">
              <FavoriteIcon fillColor="white" />
            </Link>
            <Link to="/profile">
              <UserIcon fillColor="white" />
            </Link>
          </div>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
};

export default NavBar;
