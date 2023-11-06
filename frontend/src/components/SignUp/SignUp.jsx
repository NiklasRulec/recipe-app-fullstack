import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log("clicked");

    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/signup", data);
      nav("/login");
    } catch (e) {
      if (e?.response?.data?.error?.message) {
        setError(e?.response?.data?.error?.message);
      } else {
        setError("An Error occured, try again later");
      }
    }
  };

  return (
    <section className="signup-section">
      <h2>Registrieren</h2>
      <form onSubmit={submit}>
        <input name="name" type="text" placeholder="Name" />
        <input name="email" type="text" placeholder="Email" />
        <input name="password" type="password" placeholder="Passwort" />
        <input type="submit" className="btn" value="Registrieren" />
      </form>
      <h4>Account bereits vorhanden?</h4>
      <Link to="/login">
        <p className="btn">Login</p>
      </Link>
    </section>
  );
};

export default SignUp;
