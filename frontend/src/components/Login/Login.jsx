import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Login.css";
import { useContext, useState } from "react";
import axios from "axios";

const Login = () => {
  const { refetch } = useContext(UserContext);
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/login", data);
      refetch();
      nav("/profile");
    } catch (e) {
      console.log(e);
      setError("An Error occured, try again later");
    }
  };
  return (
    <section className="login-section">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Passwort" />
        <input type="submit" className="btn" value="Login" />
      </form>
      <h4>Noch keinen Account?</h4>
      <Link to="/signup">
        <p className="btn">Registrieren</p>
      </Link>
    </section>
  );
};

export default Login;
