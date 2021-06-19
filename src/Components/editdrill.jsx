import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { auth, db } from "../firebase/firebase";

function Editdrill() {
  const { id } = useParams();
  const [drill, setDrill] = useState({
    name: "",
    type: "Färdighetsövning",
    level: "11 mot 11",
    moment: "Aktivering",
    description: "",
    organization: "",
    rules: "",
    explenation: "",
  });

  auth.onAuthStateChanged((user) => {
    drill.creator_uid = user.uid;
    drill.creator_username = user.displayName;
  });

  function handleChange(event) {
    event.preventDefault();

    setDrill({ ...drill, [event.target.name]: event.target.value });

    // drill[event.target.name] = event.target.value;
  }

  function handelSumbit() {
    db.collection("drills")
      .doc(id)
      .update(drill)
      .then(() => {
        window.location.replace("/drill/" + id);
      });
  }

  useEffect(() => {
    db.collection("drills")
      .doc(id)
      .get()
      .then((snapshot) => {
        setDrill(snapshot.data());
      });
  }, [id]);

  return (
    <div className="container">
      <div className="col-md-12">
        <h1 className="title">Redigera övning</h1>
        <form>
          <div className="field">
            <label htmlFor="name" className="label">
              Namn
            </label>
            <input
              type="text"
              className=" input control"
              name="name"
              id="name"
              placeholder="Namn på övningen"
              required
              onChange={handleChange}
              value={drill.name}
            />
          </div>
          <div className="field">
            <label htmlFor="type" className="label">
              Typ av övning
            </label>
            <select
              name="type"
              className="control select"
              id="type"
              required
              onChange={handleChange}
              value={drill.type}
            >
              <option value="Spelövning">Spelövning</option>
              <option value="Färdighetsövning">Färdighetsövning</option>
              <option value="Fysövning">Fysövning</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="level" className="label">
              Nivå
            </label>
            <select
              name="level"
              className="control select"
              id="level"
              required
              onChange={handleChange}
              value={drill.level}
            >
              <option value="11 mot 11">11 mot 11</option>
              <option value="9 mot 9">9 mot 9</option>
              <option value="7 mot 7">7 mot 7</option>
              <option value="5 mot 5">5 mot 5</option>
              <option value="3 mot 3">3 mot 3</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="moment" className="label">
              Moment
            </label>
            <select
              name="moment"
              id="moment"
              className="control select"
              required
              onChange={handleChange}
              value={drill.moment}
            >
              <optgroup label="Uppvärmning">
                <option value="Aktivering">Aktivering</option>
                <option value="Fotbollsrörlighet">Fotbollsrörlighet</option>
                <option value="Löpteknik">Löpteknik</option>
                <option value="Fotarbete">Fotarbete</option>
                <option value="Hoppa-landa-löp">Hoppa-landa-löp</option>
              </optgroup>
              <optgroup label="Anfallsspel">
                <option value="Speluppbyggnad">Speluppbyggnad</option>
                <option value="Kontring">Kontring</option>
                <option value="Komma till avslut och göra mål">
                  Komma till avslut och göra mål
                </option>
              </optgroup>
              <optgroup label="Försvarsspel">
                <option value="Förhindra speluppbyggnad">
                  Förhindra speluppbyggnad
                </option>
                <option value="Återerövring av bollen">
                  Återerövring av bollen
                </option>
                <option value="Förhinra och rädda avslut">
                  Förhindra och rädda avslut
                </option>
              </optgroup>
              <optgroup label="Fotbollsfys">
                <option value="Explosiv träning">Explosiv träning</option>
                <option value="Förbättra och behålla återhämtningsförmågan mellan aktioner">
                  Förbättra och behålla återhämtningsförmågan mellan aktioner
                </option>
                <option value="Fotbollsstyrka">Fotbollsstyrka</option>
                <option value="Fotbollsrörlighet">Fotbollsrörlighet</option>
                <option value="Fotbollskoordination">
                  Fotbollskoordination
                </option>
                <option value="Lek">Lek</option>
              </optgroup>
            </select>
          </div>
          <div className="field">
            <label htmlFor="explination" className="label">
              Varför?
            </label>
            <textarea
              name="explenation"
              id="explenation"
              cols="30"
              rows="10"
              className="control textarea"
              placeholder="Ange varför detta ska tränas kopplat till vad spelaren och laget ska förstärka eller förbättra. Exempelvis: Spelövning: spela sig ur press i speluppbyggnaden. Färdighetsövning:  förbättra tillslagstekniken inför spelet"
              required
              onChange={handleChange}
              value={drill.explenation}
            ></textarea>
          </div>
          <div className="field">
            <label htmlFor="description" className="label">
              Beskrivning
            </label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              className="control textarea"
              placeholder="Beteenden/aktioner som gör att övningens vad uppfylls. För spelövning: Vad prioriteras i de aktuella skedena?  När ska spelarna agera? Vilket arbetssätt ska spelarna tillämpa? För färdighetsövning: Ange när och hur spelaren ska agera. Driv bollen framåt för att erövra tom yta."
              required
              onChange={handleChange}
              value={drill.description}
            ></textarea>
          </div>
          <div className="field">
            <label htmlFor="organization" className="label">
              Organisation
            </label>
            <textarea
              name="organization"
              id="organization"
              cols="30"
              rows="10"
              className="control textarea"
              placeholder="Antal spelare (inklusive målvakter och jokrar), yta eller spelplan med mål, bollar, koner och västar. För spelövning: Lagens formation."
              required
              onChange={handleChange}
              value={drill.organization}
            ></textarea>
          </div>
          <div className="field">
            <label htmlFor="rules" className="label">
              Anvisningar
            </label>
            <textarea
              name="rules"
              id="rules"
              cols="30"
              rows="10"
              className="control textarea"
              placeholder="Regler, förutsättningar och kort övningsbeskrivning. Vad är uppgiften?"
              required
              onChange={handleChange}
              value={drill.rules}
            ></textarea>
          </div>
          <button
            type="button"
            className="button is-success control"
            onClick={handelSumbit}
          >
            Uppdatera
          </button>
        </form>
      </div>
      <br />
    </div>
  );
}

export default Editdrill;
