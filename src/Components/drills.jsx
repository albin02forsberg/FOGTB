import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
// Components
import Card from "./card";

function Drills() {
  const [drills, setDrills] = useState([]);

  useEffect(() => {
    db.collection("drills").orderBy("clicks", "desc")
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
      <div className="row">
        <div className="col-md-12">
          <h1 className="h1">Övningar</h1>
          <Link to="/drillcreator">
            <button className="btn btn-primary">Skapa övningar</button>
          </Link>
          <hr/>
          <div className="card-columns">
            {drills.map((doc) => {
              return (
                <Card
                  title={doc.name}
                  key={doc.id}
                  subtitle={doc.type}
                  level={doc.level}
                  link={"/drill/" + doc.id}
                  btntext="övning"
                  img_url={doc.img_url}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12"></div>
      </div>
    </div>
  );
}

export default Drills;
