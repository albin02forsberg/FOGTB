import React, { useEffect, useState } from "react";

import Card from "./card";

import { auth, db } from "../firebase/firebase";
// import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState({});
  const [id, setId] = useState("");
  // const[teams, setTeams]=useState([]);

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
        snapshot.docs.forEach((doc) => {
          setUser(doc.data());
        });
      })
      .then(() => {
        // setTeams(user.teams);
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
          {/* <Teams teams={teams} /> */}
        </div>
      </div>
    </div>
  );
}

// function Teams(props) {
//   return (
//     <ul className="list-group">
//       {props.teams.map((team) => {
//         return (
//           <li className="list-group-item">
//             <Link to={"/team/id"}>{team}</Link>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

export default Dashboard;
