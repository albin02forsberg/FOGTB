import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import Modal from "./modal";

function Drill() {
  const { id } = useParams();
  const [drill, setDrill] = useState({});
  const [display, setDisplay] = useState(false);
  // const [pop, setPop] = useState({ usersClick: [], clicks: 0 });

  useEffect(() => {
    db.collection("drills")
      .doc(id)
      .get()
      .then((snapshot) => {
        setDrill(snapshot.data());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // useEffect(() => {
  //   if (user) {
  //     drill.usersClick.push(user.uid);
  //     drill.clicks++;
  //     db.collection("drills")
  //       .doc(id)
  //       .update(drill)
  //       .catch((err) => console.log(err));
  //   }
  // }, [user, drill]);

  auth.onAuthStateChanged((user) => {
    if (user) {
      if (auth.currentUser.uid === drill.creator_uid) {
        setDisplay(true);
      }
    }
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <h1 className="h1">{drill.name}</h1>
          {display && (
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Radera
              </button>
              <Link to={"/editdrill/" + drill.id}>
                <button className="btn btn-primary">Redigera</button>
              </Link>
              <Modal title="Hello" />
            </div>
          )}
          <hr />
          <p>
            Skapad av:{" "}
            <Link to={"/user/" + drill.creator_uid}>
              {drill.creator_username}
            </Link>{" "}
          </p>
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Moment</th>
                <th>Typ</th>
                <th>Nivå</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{drill.moment}</td>
                <td>{drill.type}</td>
                <td>{drill.level}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="h2">Varför?</h2>
          <p>{drill.explenation}</p>
          <h2 className="h2">Beskrivning</h2>
          <p>{drill.description}</p>
          <h2 className="h2">Organisation</h2>
          <p>{drill.organization}</p>
          <h2 className="h2">Anvisningar</h2>
          <p>{drill.rules}</p>
        </div>
        <div className="col-lg-6">
          <img
            src={drill.img_url}
            alt={drill.name}
            className="img-thumbnail img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default Drill;
