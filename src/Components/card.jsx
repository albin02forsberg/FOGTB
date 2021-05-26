import React from "react";

import { Link } from "react-router-dom";

function Card(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{props.title}</h4>
        <h6 className="card-subtilte text-muted">{props.subtitle}</h6>
        <div className="card-text">
          <p>{props.text}</p>
        </div>
        <Link to={props.link}>
          <button className="btn btn-primary">Gå till {props.title}</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
