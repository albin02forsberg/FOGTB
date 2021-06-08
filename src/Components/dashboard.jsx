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
          setFirstName(doc.data().firstName)
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // setUser(db.collection("users").get(id));
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1 className="h1">Välkommen, {firstName}</h1>
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
          <h2 className="h2">Mina lag</h2>
          <ul className="list-group">
            {teams.map((team) => {
              return (
                <li className="list-group-item">
                  <Link to={"/team/" + team.id}>{team.name}</Link>
                </li>
              );
            })}
            <li className="list-group-item">
              <Link to={"/createteam"}>Skapa lag</Link>
            </li>
            {/* <Teams teams={teams} /> */}
          </ul>
        </div>
        <div className="col-lg-6">
          <h2 className="h2">Kommande aktiviteter</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
