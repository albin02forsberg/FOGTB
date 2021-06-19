import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase/firebase";

// Components

import SessionDrill from "./sessionDrill";

function Session() {
  const { id } = useParams();
  const [session, setSession] = useState({});
  const [drills, setDrills] = useState([]);

  useEffect(() => {
    db.collection("sessions")
      .doc(id)
      .get()
      .then((snapshot) => {
        setSession(snapshot.data());
        setDrills(snapshot.data().drills);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="h1">{session.name}</h1>
          <h2 className="h2">Beskrivning</h2>
          <p>{session.description}</p>

          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <td>Moment</td>
                <td>Nivå</td>
                <td>Antal övningar</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{session.moment}</td>
                <td>{session.level}</td>
                <td>{drills.length + " st"} </td>
              </tr>
            </tbody>
          </table>

          {/* <p>{JSON.stringify(session.drills)}</p> */}
        </div>
      </div>
      <div className="test">
        {drills.map((doc) => {
          return <SessionDrill id={doc} />;
        })}
      </div>
    </div>
  );
}

export default Session;
