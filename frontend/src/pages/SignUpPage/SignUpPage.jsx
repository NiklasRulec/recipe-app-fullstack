import SignUp from "../../components/SignUp/SignUp";
import "./SignUpPage.css";
import Logo from "../../assets/img/Tasty Logo.png";

const SignUpPage = () => {
  return (
    <>
      <section className="signup-page-section">
        <img src={Logo} alt="logo" />
        <SignUp />
      </section>
    </>
  );
};

export default SignUpPage;
