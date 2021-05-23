import React from "react";
import { auth } from "../firebase/firebase";

import Card from "./card";

function Dashboard() {
  if (sessionStorage.getItem("user") === "null") {
    window.location.replace("/login");
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="h1">Välkommen, {auth.currentUser.displayName}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-deck">
            <Card
              title="Övningar"
              text="Visa och skapa övningar"
              link="drills"
            />
            <Card
              title="Träningspass"
              text="Visa och skapa träninspass"
              link="sessions"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <h2 className="h2">Mina lag</h2>
          <ul className="list-group">
            <li className="list-group-item">Lag 1</li>
            <li className="list-group-item">Lag 2</li>
            <li className="list-group-item">Lag 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
