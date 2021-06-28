import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";

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
    <div>
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="title">Träningspass</div>
          <Link to="/createsession">
            <button className="button is-secondary">Skapa träningspass</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="column">
          <h2 className="subtitle">Innehåll</h2>
        </div>
        <div className="column">
          <aside className="menu">
            <p className="menu-label">Träningspass</p>
            <ul className="menu-list">
              {sessions.map((doc) => {
                return (
                  <li>
                    <Link to={"/session/" + doc.id} className="is-link">
                      {doc.name} - {doc.level}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Sessions;
