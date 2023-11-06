import "./FavoriteCard.css";

const FavoriteCard = (props) => {
  return (
    <div className="favorite-card">
      <img src={props.img} alt={props.title} />
      <h4>{props.title}</h4>
    </div>
  );
};

export default FavoriteCard;
