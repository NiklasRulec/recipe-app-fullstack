import "./LoginPage.css";
import NavBar from "../../components/NavBar/NavBar";
import Login from "../../components/Login/Login";

const LoginPage = () => {
  return (
    <>
      <section className="login-page-section">
        <Login />
      </section>
      <NavBar />
    </>
  );
};

export default LoginPage;
