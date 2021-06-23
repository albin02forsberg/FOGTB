import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";

function CreateTeam() {
  const [team, setTeam] = useState({
    name: "",
    users: [],
    id: "",
    players: [],
  });
  const [uid, setUid] = useState();
  const [user, setUser] = useState({});

  auth.onAuthStateChanged((user) => {
    setUid(user.uid);
    team.users = [user.uid];
  });

  function handleChange(event) {
    event.preventDefault();

    setTeam({ ...team, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        setUser(snapshot.data());
      });
  }, [uid]);

  function handleSubmit() {
    db.collection("teams")
      .add(team)
      .then((ref) => {
        console.log(ref.id);
        team.id = ref.id;
        db.collection("teams")
          .doc(ref.id)
          .update(team)
          .then(() => {
            user.teams.push({ name: team.name, id: team.id });
            db.collection("users").doc(uid).update(user);
          })
          .then(() => {
            window.location.replace("/team/" + team.id);
          });
      });
  }

  return (
    <div className="container">
      <div className="column">
        <div className="col-md-12">
          <h1 className="title">Skapa lag</h1>
        </div>
      </div>
      <div className="column">
        <div className="col-md-12">
          <form>
            <div className="field">
              <label htmlFor="name" className="label">Lagets namn</label>
              <input
                type="text"
                name="name"
                id="name"
                className="control input"
                placeholder="Lagets namn"
                value={team.name}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <button
                type="button"
                className="button is-primary"
                onClick={handleSubmit}
              >
                Spara
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
