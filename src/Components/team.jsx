import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase";

function Team() {
  const { id } = useParams();
  const [team, setTeam] = useState({});
  const [players, setPlayers] = useState([]);
  const [trainings, setTrainings] = useState([]);
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

    // db.collection("teams")
    //   .doc(id)
    //   .collection("trainings")
    //   .doc()
    //   .get()
    //   .then((snapshot) => {
    //     setTrainings(snapshot.data());
    //   });
    db.collection("teams")
      .doc(id)
      .collection("trainings")
      .orderBy("date")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((training) => {
          setTrainings((arr) => [...arr, training.data()]);
        });
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
    // {users.includes(user.uid) && (
    //   <button className="button is-secondary">Redigera lag</button>
    // )}
    <div className="container">
      <div className="div">
        <p className="title">{team.name}</p>
        <hr />
      </div>
      <div className="double-col is-multiline mx-1 my-1">
        <div className="column is-6">
          <h2 className="subtitle">Matcher</h2>

          <ul className="list-group"></ul>
          <a href={"/team/" + id + "/creategame"}>
            <button className="button is-primary">Lägg till match</button>
          </a>
        </div>
        <div className="column">
          <h2 className="subtitle">Träningar</h2>

          <ul className="list-group">
            {trainings.map((doc) => {
              return (
                <Link
                  onClick={() => {
                    window.location.replace(
                      "/team/" + id + "/training/" + doc.id
                    );
                  }}
                >
                  <li>
                    Träning - {doc.place} - {doc.date} - {doc.time}
                  </li>
                </Link>
              );
            })}
          </ul>

          <a href={"/team/" + id + "/createtraining"}>
            <button className="button is-primary">Lägg till träning</button>
          </a>
        </div>
      </div>
      <div className="column">
        <h2 className="subtitle"> Spelare och statistik</h2>
        <div className="table-container">
          <table className="table is-fullwidth is-striped is-hoverable">
            <thead>
              <th>Namn</th>
              <th>Ålder</th>
              <th>Matcher</th>
              <th>Träningar</th>
              <th>Mål</th>
              <th>Assist</th>
              <th>Gula kort</th>
              <th>Röda kort</th>
              <th>Position</th>
            </thead>

            <tbody>
              {players.map((doc) => {
                return (
                  <tr>
                    <td>
                      <Link
                        onClick={() => {
                          window.location.replace("/player/" + doc.id);
                        }}
                      >
                        {doc.name}
                      </Link>
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
                  <Link
                    className="button is-primary"
                    to={"/team/" + id + "/addplayer"}
                  >
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
  );
}

export default Team;
