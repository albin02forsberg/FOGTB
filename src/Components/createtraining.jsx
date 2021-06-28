import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "../firebase/firebase";

function CreateTraining() {
  const { id } = useParams();
  const [team, setTeam] = useState({});
  const [training, setTraining] = useState({
    date: "",
    time: "",
    place: "",
    players: [],
    session: "",
    teamID: id,
    id: "",
  });

  function handleChange(event) {
    event.preventDefault();

    setTraining({ ...training, [event.target.name]: event.target.value });

    if(event.target.name === "date"){
      training.date = event.target.value.toDate;
    }
  }

  function handelSumbit() {
    // team.trainings.push(training);
    console.log(team);

    db.collection("teams")
      .doc(id)
      .collection("trainings")
      .add(training)
      .then((ref) => {
        training.id = ref.id;
        db.collection("teams")
          .doc(id)
          .collection("trainings")
          .doc(ref.id)
          .set(training)
          .then(() => {
            window.location.replace("/training/" + id + "/" + ref.id);
          });
      });
  }

  useEffect(() => {
    db.collection("teams")
      .doc(id)
      .get()
      .then((snapshot) => {
        setTeam(snapshot.data());
      });
  }, [id]);

  return (
    <div className="container">
      <div className="column">
        <h1 className="title">Lägg till träning {id}</h1>

        <form>
          <div className="field">
            <label htmlFor="date" className="label">
              Datum
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={training.date}
              onChange={handleChange}
              className="control input is-fullwidth"
            />
          </div>
          <div className="field">
            <label htmlFor="time" className="label">
              Tid
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={training.time}
              onChange={handleChange}
              className="control input is-fullwidth"
            />
          </div>
          <div className="field">
            <label htmlFor="place" className="label">
              Plats
            </label>
            <input
              type="text"
              name="place"
              id="place"
              value={training.place}
              onChange={handleChange}
              className="control input is-fullwidth"
            />
          </div>
          <div className="field">
            <button
              type="button"
              className="button is-primary"
              onClick={handelSumbit}
            >
              Spara
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTraining;
