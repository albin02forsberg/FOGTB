import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase/firebase";

function Drill() {
  const { id } = useParams();
  const [drill, setDrill] = useState({});

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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1 className="h1">{drill.name}</h1>
          <table className="table table-striped">
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
        <div className="col-md-6">
          <img src={drill.img_url} alt={drill.name} className="img-thumbnail" />
        </div>
      </div>
    </div>
  );
}

export default Drill;
