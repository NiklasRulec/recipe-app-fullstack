import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./user/UserContext";
import {
  SearchInputContext,
  AreaContext,
  RefreshContext,
} from "./context/Context";

// Routes
import Home from "./pages/Home/Home";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import ResetPassword from "./user/ResetPassword";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

function App() {
  const { isLoggedIn, logout } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState("");
  const [area, setArea] = useState("American");
  const [refresh, setRefresh] = useState(true);

  return (
    <>
      <div className="mobileonly">
        <h1>Mobile only</h1>
      </div>
      <div className="wrapper">
        <nav>
          <a href="/">Home</a>
          {!isLoggedIn && (
            <>
              <a href="/signup">Signup</a>
              <a href="/login">Login</a>
            </>
          )}
          {isLoggedIn && (
            <>
              <a href="/profile">Profile</a>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </nav>
        <main>
          <AreaContext.Provider value={{ area, setArea }}>
            <SearchInputContext.Provider
              value={{ searchInput, setSearchInput }}
            >
              <RefreshContext.Provider value={{ refresh, setRefresh }}>
                <Routes>
                  <Route path="/" element={<LoadingScreen />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/favorite" element={<FavoritePage />} />
                  <Route path="/:id" element={<DetailsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/passwordReset" element={<ResetPassword />} />
                </Routes>
              </RefreshContext.Provider>
            </SearchInputContext.Provider>
          </AreaContext.Provider>
        </main>
      </div>
    </>
  );
}

export default App;
