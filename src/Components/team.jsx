import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase";

function Team() {
  const { id } = useParams();
  const [team, setTeam] = useState({});
  const [players, setPlayers] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      window.location.replace("/");
    }
  });

  useEffect(() => {
    db.collection("teams")
      .doc(id)
      .get()
      .then((snapshot) => {
        setTeam(snapshot.data());
        setUsers(snapshot.data().users);
      });

    db.collection("players")
      .where("team", "==", id)
      .orderBy("name")
      .orderBy("games")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((player) => {
          setPlayers((arr) => [...arr, player.data()]);
        });
      });
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="h1">{team.name}</h1>
        </div>
        <div className="col-md-12">
          {users.includes(user.uid) && (
            <button className="btn btn-primary">Redigera lag</button>
          )}
        </div>
        <div className="col-md-6">
          <h2 className="h2">Matcher</h2>

          <ul className="list-group"></ul>

          <button className="btn btn-primary">Lägg till match</button>
        </div>
        <div className="col-md-6">
          <h2 className="h2">Träningar</h2>
          <ul className="list-group"></ul>

          <button className="btn btn-primary">Lägg till träning</button>
        </div>
        <div className="col-md-12">
          <h2 className="h2">Spelare och statistik</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>Namn</td>
                  <td>Ålder</td>
                  <td>Matcher</td>
                  <td>Träningar</td>
                  <td>Mål</td>
                  <td>Assist</td>
                  <td>Gula kort</td>
                  <td>Röda kort</td>
                  <td>Position</td>
                </tr>
              </thead>

              <tbody>
                {players.map((doc) => {
                  return (
                    <tr>
                      <td>
                        <Link to={"/player/" + doc.id}>{doc.name}</Link>
                      </td>
                      <td>{doc.year}</td>
                      <td>{doc.games.Lenght}</td>
                      <td>{doc.trainings.Length}</td>
                      <td>{doc.goals}</td>
                      <td>{doc.assist}</td>
                      <td>{doc.yellow}</td>
                      <td>{doc.red}</td>
                      <td>{doc.pos}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7">
                    <Link className="btn btn-primary" to={"/addplayer/" + id}>
                      Lägg till spelare
                    </Link>
                  </td>
                  <td>Antal spelare:</td>
                  <td>{players.length}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
