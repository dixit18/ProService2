import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  return (
    <Link to="/services?cat=car">
      <div className="catCard">
        <img src={card.imga} alt="" />
        <span className="desc">{card.description}</span>
        <span className="title">{card.name}</span>
      </div>
    </Link>
  );
}
export default CatCard;
