import React from "react";
import { db } from "../firebase/firebase";

function Modal(props) {
  let alertStyle = "btn btn-" + props.type;
  return (
    <div>
      <div
        className="modal"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{props.text}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Stäng
              </button>
              <button
                type="button"
                className={alertStyle}
                onClick={() => {
                  switch (props.action) {
                    case "delPlayer":
                      db.collection("players")
                        .doc(props.id)
                        .delete()
                        .then(() =>
                          window.location.replace("/teams/" + props.fallback)
                        );
                      break;
                    case "delDrill":
                      db.collection("drills")
                        .doc(props.id)
                        .delete()
                        .then(() =>
                          window.location.replace("/user/" + props.fallback)
                        );
                      break;
                    default:
                      break;
                  }
                }}
              >
                {props.title}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
