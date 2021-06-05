import React, { useEffect, useState } from "react";

import Card from "./card";

import { auth, db } from "../firebase/firebase";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState({});
  const [id, setId] = useState("");
  const [teams, setTeams] = useState([]);

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
      .get(id)
      .then((snapshot) => {
        setUser(snapshot.data());
        setTeams((arr) => snapshot.data().teams);
      })
      .catch((err) => {
        console.log(err);
      });
    // setUser(db.collection("users").get(id));
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="h1">Välkommen, {user.displayName}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-deck">
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
      </div>
      <div className="row">
        <div className="col-lg-6">
          <h2>Mina lag</h2>

          <ul className="list-group">
            {teams.forEach((team) => {
              console.log(team);
              <Teams team={team} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Teams(props) {
  console.log(props.teams);

  return (
    <li>
      <Link>{props.team}</Link>
    </li>
  );
}

export default Dashboard;
