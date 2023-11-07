import "./LoginPage.css";
import Login from "../../components/Login/Login";
import Logo from "../../assets/img/Tasty Logo.png";

const LoginPage = () => {
  return (
    <>
      <section className="login-page-section">
        <img src={Logo} alt="logo" />
        <Login />
      </section>
    </>
  );
};

export default LoginPage;
