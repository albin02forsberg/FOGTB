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
      <div className="column">
        <h1 className="title">{session.name}</h1>
        <h2 className="subtitle">Beskrivning av passet</h2>
        <p>{session.description}</p>
        <div className="table-container">
          <table className="table table-striped is-fullwidth">
            <thead>
              <tr>
                <td>Nivå</td>
                <td>Antal övningar</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>{session.moment}</td> */}
                <td>{session.level}</td>
                <td>{drills.length + " st"} </td>
              </tr>
            </tbody>
          </table>
          <hr />
        </div>

        {/* <p>{JSON.stringify(session.drills)}</p> */}
      </div>
      <div className="columns is-multiline mx-4">
        {drills.map((doc) => {
          return (
            <div>
              <SessionDrill id={doc} />
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Session;
