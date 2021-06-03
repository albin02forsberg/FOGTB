import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import Card from "./card";

function Sessions() {
  const [sessions, setSession] = useState([]);

  useEffect(() => {
    db.collection("sessions")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setSession((arr) => [...arr, doc.data()]);
        });
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="h1">Träningspass</h1>
          <Link to="/createsession">
            <button className="btn btn-primary">Skapa träningspass</button>
          </Link>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card-columns">
              {sessions.map((session) => {
                return (
                  <Card
                    title={session.name}
                    subtitle={session.level}
                    btntext="träningspass"
                    id={session.id}
                    link={"session/" + session.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sessions;
