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
      <div className="columns">
        <div className="column">
          <h1 className="title">Övningar</h1>
          <Link to="/drillcreator">
            <button className="button is-primary">Skapa övningar</button>
          </Link>
          <hr />
        </div>
      </div>
      <div className="tile is-ancestor">
        <div className="column is-12">
          <aside className="menu">
            <div className="menu-label">Övningar</div>
            <ul className="menu-list">
              {drills.map((doc) => {
                return (
                  <li>
                    <Link to={"/drill/" + doc.id}>
                      {doc.name} - {doc.level} - {doc.type}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>

        {/* {drills.map((doc) => {
          return (
            // <Card
            //   title={doc.name}
            //   key={doc.id}
            //   subtitle={doc.type}
            //   level={doc.level}
            //   link={"/drill/" + doc.id}
            //   btntext="övning"
            //   img_url={doc.img_url}
            // />
            <p>h</p>
          );
        })} */}
      </div>
      <div className="row">
        <div className="col-md-12"></div>
      </div>
    </div>
  );
}

export default Drills;
