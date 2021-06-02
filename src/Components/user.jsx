import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase/firebase";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    db.collection("users")
      .get(id)
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
        </div>
        <div className="col-md-12">
            <h2 className="h2">Träningspass</h2>
        </div>
      </div>
    </div>
  );
}

export default User;
