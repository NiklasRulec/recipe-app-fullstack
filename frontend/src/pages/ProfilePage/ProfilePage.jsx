import { useContext, useEffect, useState } from "react";
import { RefreshContext } from "../../context/Context";
import { UserContext } from "../../context/UserContext";
import NavBar from "../../components/NavBar/NavBar";
import "./ProfilePage.css";
import axios from "axios";

const ProfilePage = () => {
  const { refresh, setRefresh } = useContext(RefreshContext);
  const { isLoggedIn, logout } = useContext(UserContext);
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      setLoggedUser(data);
      console.log(data);
      setRefresh((prev) => !prev);
    };
    fetchUser();
  }, []);

  return (
    <>
      <section className="profilepage-section">
        {loggedUser ? (
          <>
            <article className="profilepage-top">
              <button onClick={logout} className="btn">
                Logout
              </button>
            </article>
            <h2>Hallo, {loggedUser?.name}</h2>
            <p>Favoriten-Anzahl : {loggedUser?.favorites.length}</p>
          </>
        ) : (
          <></>
        )}
      </section>
      <NavBar />
    </>
  );
};

export default ProfilePage;
