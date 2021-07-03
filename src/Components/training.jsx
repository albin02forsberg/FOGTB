import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";

function Training() {
  const { id } = useParams();
  const { teamid } = useParams();
  const [training, setTraining] = useState({});
  const [team, setTeam] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    db.collection("teams")
      .doc(teamid)
      .collection("trainings")
      .doc(id)
      .get()
      .then((snapshot) => {
        setTraining(snapshot.data());
        setPlayers(snapshot.data().players);
      });

    db.collection("players")
      .where("team", "==", teamid)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((player) => {
          setTeam((arr) => [...arr, player.data()]);
        });
      });

    console.log(id);
  }, [id, teamid]);

  function handelChange(e) {
    console.log(e.target.checked);
    if (e.target.checked) {
      training.players.push(e.target.value);
    } else {
      training.players.pop(e.target.value);
    }
  }

  function handleSubmit() {
    db.collection("teams")
      .doc(teamid)
      .collection("trainings")
      .doc(id)
      .update({ players: players })
      .then(() => {
        window.location.replace("/team/" + teamid);
      });
  }

  return (
    <div className="container">
      <div className="columns is-multiline mx-2"></div>
      <div className="column">
        <h1 className="title">Träning</h1>
        <div className="table-container">
          <table className="table table-striped is-fullwidth">
            <thead>
              <th>Datum</th>
              <th>Tid</th>
              <th>Plats</th>
            </thead>
            <tbody>
              <td>{training.date}</td>
              <td>{training.time}</td>
              <td>{training.place}</td>
            </tbody>
          </table>
        </div>
      </div>
      <div className="column">
        <h2 className="subtitle">Spelare</h2>
        <div className="table-container">
          <table className="table table-striped is-fullwidth">
            <thead>
              <td>Närvaro</td>
              <td>Namn</td>
            </thead>
            <tbody>
              {team.map((doc) => {
                if (players.includes(doc.id)) {
                  return (
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          className="control"
                          value={doc.id}
                          onChange={handelChange}
                          checked
                        />
                      </td>
                      <td>{doc.name}</td>
                    </tr>
                  );
                } else {
                  return (
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          value={doc.id}
                          onChange={handelChange}
                        />
                      </td>
                      <td>{doc.name}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
          <div className="buttons">
            <button className="button is-primary" onClick={handleSubmit}>
              Spara
            </button>
            <Link
              to={"/team/" + teamid}
              onClick={() => {
                window.location.replace("/team/" + teamid);
              }}
            >
              <button className="button is-secondary">Tillbaka</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Training;
