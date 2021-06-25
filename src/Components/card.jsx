import React from "react";

import { Link } from "react-router-dom";

function Card(props) {
  return (
    <div className="tile is-vertical is-parent">
      <div className=" card tile is-child">
        <div className="card-header">
          <p className="card-header-title">{props.title}</p>
        </div>
        <div className="card-content">
          <div className="content">
            <p>{props.subtitle}</p>
            <p>{props.level}</p>

            <p>{props.text}</p>
          </div>
        </div>
        <div className="card-footer">
          <Link to={props.link} className="card-footer-item  button is-link">
            Gå till {props.btntext}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
