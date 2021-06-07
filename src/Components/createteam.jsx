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
      <div className="row">
        <div className="col-md-12">
          <h1 className="h1">Skapa lag</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <form>
            <div className="form-group">
              <label htmlFor="name">Lagets namn</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Lagets namn"
                value={team.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary"
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
