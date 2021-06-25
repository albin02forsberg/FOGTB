import React, { useEffect, useState } from "react";

import Card from "./card";

import { auth, db } from "../firebase/firebase";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState({});
  const [id, setId] = useState("");
  const [teams, setTeams] = useState([]);
  const [firstName, setFirstName] = useState("");

  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.replace("/login");
    } else {
      setUser(user);
      setId(user.uid);
    }
  });

  useEffect(() => {
    db.collection("users")
      .where("uid", "==", id)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setTeams(doc.data().teams);
          setFirstName(doc.data().firstName);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // setUser(db.collection("users").get(id));
  }, [id]);

  return (
    <div>
      <div className="hero is-primary">
        <div className="hero-body">
          <p className="title">Välkommen, {firstName || user.displayName}</p>
          <p className="subtitle">Dashboard</p>
        </div>
      </div>
      <div className="container">
        <div className="column">
          <div className="tile is-parent">
            <Card
              title="Övningar"
              text="Visa och skapa övningar"
              link="drills"
              btntext="övningar"
            />
            <Card
              title="Träningspass"
              text="Visa och skapa träninspass"
              link="sessions"
              btntext="träningspass"
            />
          </div>
        </div>
        <div className="columns">

        <div className="column is-6 mx-2">
          <aside className="menu">
            <p className="menu-label">Mina lag</p>
            <ul className="menu-list menu-list-border-left">
              {teams.map((team) => {
                return (
                  <li>
                    <Link to={"/team/" + team.id}>{team.name}</Link>
                  </li>
                );
              })}
              <li>
                <Link className="is-active" to={"/createteam"}>
                  Skapa lag
                </Link>
              </li>
              {/* <Teams teams={teams} /> */}
            </ul>
          </aside>
        </div>
        <div className="column is-6">
          <h2 className="h2">Kommande aktiviteter</h2>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
