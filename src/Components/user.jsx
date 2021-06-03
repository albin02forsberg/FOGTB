import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase/firebase";
import Card from "./card";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [drills, setDrills] = useState([]);

  useEffect(() => {
    db.collection("users").where("uid", "==", id)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setUser(doc.data());
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // setUser(db.collection("users").get(id));
  }, [id]);

  useEffect(() => {
    db.collection("drills")
      .where("creator_uid", "==", id)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          // drills.push(doc.data());
          setDrills((arr) => [...arr, doc.data()]);
          console.log(doc.data());
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="h1">{user.username}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h2 className="h2">Övningar</h2>
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
        <div className="col-md-12">
          <h2 className="h2">Träningspass</h2>
        </div>
      </div>
    </div>
  );
}

export default User;
