import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase";

function Createsession() {
  const [drills, setDrills] = useState([]);
  const [uid, setUid] = useState("");
  const [list, setList] = useState([]);
  const [session, setSession] = useState({
    name: null,
    description: null,
    level: "11 mot 11",
  });
  const [error, setError] = useState("");

  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.replace("/");
    } else {
      setUid(user.uid);
    }
  });

  useEffect(() => {
    db.collection("drills")
      .where("creator_uid", "==", uid)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setDrills((arr) => [...arr, doc.data()]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uid]);

  function handleChange(event) {
    event.preventDefault();
    setSession({ ...session, [event.target.name]: event.target.value });
  }

  return (
    <div className="container">
      <div className="column">
        <h1>Skapa träningspass</h1>
        <div className="table-container">
          <table className="table table-striped is-fullwidth">
            <thead>
              <tr>
                <th>Välj</th>
                <th>Namn</th>
                <th>Nivå</th>
                <th>Moment</th>
                <th>Skapare</th>
              </tr>
            </thead>
            <tbody>
              {drills.map((doc) => {
                return (
                  <tr>
                    <td
                      onChange={(event) => {
                        if (event.target.checked) {
                          setList((arr) => [...arr, event.target.name]);
                        } else {
                          if (list.includes(event.target.name)) {
                            setList(
                              list.filter((item) => item !== event.target.name)
                            );
                          }
                        }
                      }}
                    >
                      <input type="checkbox" name={doc.id} id={doc.id} />
                    </td>
                    <td>{doc.name}</td>
                    <td>{doc.level}</td>
                    <td>{doc.moment}</td>
                    <td>
                      <Link to={"/user/" + doc.creator_uid}>
                        {doc.creator_username}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="field">
          <label htmlFor="name" className="label">
            Träningspassets namn
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Passets namn"
            className="input control"
            onChange={handleChange}
            value={session.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="level" className="label">
            Nivå
          </label>
          <select
            className="select control"
            onChange={handleChange}
            name="level"
            id="level"
            value={session.level}
          >
            <option value="11 mot 11">11 mot 11</option>
            <option value="9 mot 9">9 mot 9</option>
            <option value="7 mot 7">7 mot 7</option>
            <option value="5 mot 5">5 mot 5</option>
            <option value="3 mot 3">3 mot 3</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="description" className="label">
            Beskrivning
          </label>
          <textarea
            cols="10"
            rows="10"
            type="text"
            name="description"
            id="description"
            className="textarea control"
            onChange={handleChange}
            value={session.description}
            placeholder="Beskrivning av passet"
          />
        </div>
        <p>{error}</p>
        <div className="field">
          <button
            className="button is-success"
            onClick={() => {
              if (list.length <= 0) {
                setError("Du har inga övningar valda...");
              } else if (session.name === null) {
                setError("Ge passet ett namn");
              } else if (session.description === null) {
                setError("Ge passet en beskrivning");
              } else {
                db.collection("sessions")
                  .add({
                    ...session,
                    drills: list,
                  })
                  .then((ref) => {
                    db.collection("sessions")
                      .doc(ref.id)
                      .update({ id: ref.id })
                      .then(() => {
                        window.location.replace("/session/" + ref.id);
                      });
                  });
              }
            }}
          >
            Spara och fortsätt
          </button>
        </div>
      </div>
    </div>
  );
}

export default Createsession;
