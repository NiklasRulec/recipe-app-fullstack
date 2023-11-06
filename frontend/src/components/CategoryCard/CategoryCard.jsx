import "./CategoryCard.css";

const CategoryCard = (props) => {
  return (
    <div className="category-card">
      <img src={props.img} alt={props.title} />
      <h4>{props.title}</h4>
    </div>
  );
};

export default CategoryCard;
