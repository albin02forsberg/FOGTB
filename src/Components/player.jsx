import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase/firebase";

function Player() {
  const { id } = useParams();
  const [player, setPlayer] = useState({});
  const [trainings, setTrainings] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    db.collection("players")
      .doc(id)
      .get()
      .then((snapshot) => {
        setPlayer(snapshot.data());
        setTrainings(snapshot.data().trainings);
        setGames(snapshot.data().games);
        console.log(snapshot.data());
      });
  }, [id]);

  return (
    <div className="container">
      <div className="hero">
        <div className="hero-body" >
          <h1 className="title">{player.name}</h1>
          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Träningar</p>
                <p className="title">{trainings.lenght || 0}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Matcher</p>
                <p className="title">{games.lenght || 0}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Position</p>
                <p className="title">{player.pos}</p>
              </div>
            </div>
            <div className="level-item has-text-centered"></div>
          </nav>
        </div>
        <div className="column"></div>
      </div>
    </div>
  );
}

export default Player;
