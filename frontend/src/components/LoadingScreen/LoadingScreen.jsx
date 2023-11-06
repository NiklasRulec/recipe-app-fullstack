import "./LoadingScreen.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signup");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="loadingscreen">
      <div className="loader"></div>
    </section>
  );
};

export default LoadingScreen;
