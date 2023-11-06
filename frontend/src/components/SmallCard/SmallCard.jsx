import "./SmallCard.css";

const SmallCard = (props) => {
  return (
    <div className="smallcard" style={{ backgroundImage: `url(${props.img})` }}>
      <div className="smallcard-background-overlay">
        <p>{props.title}</p>
      </div>
    </div>
  );
};

export default SmallCard;
