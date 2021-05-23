import React from "react";

function Card(props) {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{props.title}</h4>
        <h6 className="card-subtilte text-muted">{props.subtitle}</h6>
        <div className="card-text">
          <p>{props.text}</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            window.location.replace(props.link);
          }}
        >
          Gå till {props.title}
        </button>
      </div>
    </div>
  );
}

export default Card;
