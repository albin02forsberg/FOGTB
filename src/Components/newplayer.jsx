import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";

function Newplayer() {
  const { id } = useParams();

  const [team, setTeam] = useState({});
  const [player, setPlayer] = useState({
    name: "",
    year: "",
    games: [],
    trainings: [],
    yellow: 0,
    red: 0,
    assist: 0,
    goals: 0,
    pos: "MV",
    id: "",
  });

  function handleChange(event) {
    event.preventDefault();

    setPlayer({ ...player, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    db.collection("teams")
      .doc(id)
      .get()
      .then((snapshot) => {
        setTeam(snapshot.data());
      });
  }, [id]);

  function handleSubmit() {
    team.players.push(player);

    db.collection("players")
      .add(player)
      .then((res) => {
        player.id = res.id;
        player.team = id;
        db.collection("players")
          .doc(res.id)
          .update(player)
          .then(() => {
            window.location.replace("/team/" + id);
          });
      });
  }

  return (
    <div className="container">
      <div className="column">
        <h1 className="title">Ny spelare i {team.name}</h1>
        <form>
          <div className="field">
            <label htmlFor="name" className="label">
              Namn
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="control input"
              placeholder="Spelarens namn"
              value={player.name}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="year" className="label">
              Födelseår
            </label>
            <input
              className="control input"
              type="number"
              min="1900"
              max="2100"
              name="year"
              id="year"
              placeholder="Spelarens födelseår"
              value={player.year}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="pos" className="label">
              Position
            </label>
            <select
              name="pos"
              id="pos"
              className="control select is-fullwidth"
              value={player.pos}
              onChange={handleChange}
            >
              <option value="MV">MV</option>
              <option value="MB">MB</option>
              <option value="LB">LB</option>
              <option value="RB">RB</option>
              <option value="CM">CM</option>
              <option value="RM">RM</option>
              <option value="LM">LM</option>
              <option value="CF">CF</option>
              <option value="LF">LF</option>
              <option value="RF">RF</option>
            </select>
          </div>
          <div className="field">
            <div className="buttons">
              <button
                type="button"
                className="button is-primary"
                onClick={handleSubmit}
              >
                Spara
              </button>
              <Link to={"/team/" + id}>
                <button type="button" className="button is-secondary">Tillbaka</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newplayer;
