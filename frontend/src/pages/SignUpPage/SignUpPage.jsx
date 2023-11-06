import NavBar from "../../components/NavBar/NavBar";
import SignUp from "../../components/SignUp/SignUp";
import "./SignUpPage";

const SignUpPage = () => {
  return (
    <>
      <section className="signup-page-section">
        <SignUp />
      </section>
      <NavBar />
    </>
  );
};

export default SignUpPage;
