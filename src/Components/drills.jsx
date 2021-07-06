import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
// Components
// import Card from "./card";

function Drills() {
  const [drills, setDrills] = useState([]);
  // const [counter, setCounter] = useState(0);

  useEffect(() => {
    db.collection("drills")
      .orderBy("clicks", "desc")
      .orderBy("name", "asc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          // drills.push(doc.data());
          setDrills((arr) => [...arr, doc.data()]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
      <div className="container">
        <p className="title">Övningar</p>
        <hr />
        <div className="column">
          {/* <aside className="menu">
            <p className="menu-label">Övningar</p>
            <ul className="menu-list">
              {drills.map((doc) => {
                return (
                  <li>
                    <Link to={"/drill/" + doc.id} className="is-link">
                      {doc.name} - {doc.level} - {doc.type}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside> */}
          <div className="table-container">
            <table className="table is-striped is-hoverable is-fullwidth">
              <thead>
                <th>Namn</th>
                <th>Nivå</th>
                <th>Typ</th>
                <th>Moment</th>
              </thead>
              <tbody>
                {drills.map((doc) => {
                  return (
                    <tr
                      onClick={() => {
                        window.location.replace("/drill/" + doc.id);
                      }}
                    >
                      <td>
                        <Link to={"/drill/" + doc.id}>{doc.name}</Link>
                      </td>
                      <td>{doc.level}</td>
                      <td>{doc.type}</td>
                      <td>{doc.moment}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}

export default Drills;
