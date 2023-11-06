import "./HeaderBar.css";
import Logo from "../../assets/img/Tasty Logo.png";

const HeaderBar = () => {
  return (
    <section className="headerbar">
      <img src={Logo} alt="logo" />
    </section>
  );
};

export default HeaderBar;
