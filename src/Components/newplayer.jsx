import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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
      <div className="row">
        <div className="col-md-12">
          <h1 className="h1">Ny spelare i {team.name}</h1>
          <form>
            <div className="form-group">
              <label htmlFor="name">Namn</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Spelarens namn"
                value={player.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Födelseår</label>
              <input
                className="form-control"
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

            <div className="form-group">
              <label htmlFor="pos">Position</label>
              <select
                name="pos"
                id="pos"
                className="form-control"
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

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Spara
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Newplayer;
