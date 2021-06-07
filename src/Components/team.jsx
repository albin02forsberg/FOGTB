import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";

function Team() {
  const { id } = useParams();
  const [team, setTeam] = useState({});
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    db.collection("teams")
      .doc(id)
      .get()
      .then((snapshot) => {
        setTeam(snapshot.data());
      });

      db.collection("players").where("team", "==", id).get().then((snapshot)=>{
          snapshot.docs.forEach((player)=>{
              setPlayers((arr)=> [...arr, player.data()])
          })
      })
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="h1">{team.name}</h1>
        </div>
        <div className="col-md-10">
          <h2 className="h2">Spelare</h2>
          <table className="table table-responsive table-striped">
            <thead>
              <tr>
                <td>Namn</td>
                <td>Ålder</td>
                <td>M</td>
                <td>G</td>
                <td>A</td>
                <td>Y</td>
                <td>R</td>
                <td>Pos</td>
              </tr>
            </thead>

            <tbody>
              {players.map((doc) => {
                return (
                  <tr>
                    <td><Link to={"/player/" + doc.id}>{doc.name}</Link></td>
                    <td>{doc.year}</td>
                    <td>{doc.games.Lenght}</td>
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
                <td>
                  <Link to={"/addplayer/" + id}>Lägg till spelare</Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="col-md-2">
          <h2 className="h2">Kalender</h2>
        </div>
      </div>
    </div>
  );
}

export default Team;
