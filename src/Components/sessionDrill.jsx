import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";

function SessionDrill(props) {
  const [drill, setDrill] = useState({});

  useEffect(() => {
    db.collection("drills")
      .doc(props.id)
      .get()
      .then((snapshot) => {
        setDrill(snapshot.data());
      });
  }, [props.id]);

  return (
    <div className="row">
      <div className="col-md-12">
        <hr />
      </div>
      <div className="col-md-6">
        <h2 className="h2">{drill.name}</h2>

        <table className="table table-striped table-responsive">
          <thead>
            <tr>
              <th>Moment</th>
              <th>Typ</th>
              <th>Nivå</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{drill.moment}</td>
              <td>{drill.type}</td>
              <td>{drill.level}</td>
            </tr>
          </tbody>
        </table>
        <h3 className="h3">Varför?</h3>
        <p>{drill.explenation}</p>
        <h3 className="h3">Beskrivning</h3>
        <p>{drill.explenation}</p>
        <h3 className="h3">Förklaring</h3>
        <p>{drill.description}</p>
        <h3 className="h3">Organisation</h3>
        <p>{drill.organization}</p>
        <h3 className="h3">Anvisningar</h3>
        <p>{drill.rules}</p>
      </div>
      <div className="col-md-6">
        <img
          src={drill.img_url}
          alt=""
          className="image  is-256x256 is-fullwidth"
        />
      </div>
    </div>
  );
}

export default SessionDrill;
