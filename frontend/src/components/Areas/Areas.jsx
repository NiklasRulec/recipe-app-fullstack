import { useContext, useEffect, useState } from "react";
import "./Areas.css";
import axios from "axios";
import { AreaContext } from "../../context/Context";

const Areas = () => {
  const [areas, setAreas] = useState([]);
  const { area, setArea } = useContext(AreaContext);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((res) => {
        setAreas(res.data.meals);
      })
      .catch((error) => {
        console.error("Fehler bei der Anfrage:", error);
      });
  }, []);

  const setAreaFunction = (value) => {
    setArea(value);
  };

  return (
    <>
      <section className="areas-section">
        <h3>Areas</h3>
      </section>
      <article className="areas-gallery">
        {areas?.map((item, index) => (
          <div key={index}>
            <p onClick={() => setAreaFunction(item.strArea)}>{item.strArea}</p>
          </div>
        ))}
      </article>
    </>
  );
};

export default Areas;
