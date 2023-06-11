import React from "react";
import { Link } from "react-router-dom";
import "../Navbar.scss";


const NavCat = (props) => {
  return (
    <div className="menu">
      <div className="item">
        <div className="item-img">
          <Link className="link menuLink" to="/">
            <img className="img-for-cat" src={props.service.img} />
          </Link>
        </div>
        <hr/>
        <div className="item-text">
          <span>{props.service.name}</span>
        </div>
      </div>
    </div>
  );
};


export default NavCat;
