import React, { useState } from "react";
import { auth, db, storage } from "../firebase/firebase";

function DrillCreator() {
  const [drill, setDrill] = useState({
    name: "",
    type: "Färdighetsövning",
    level: "11 mot 11",
    moment: "Aktivering",
    description: "",
    organization: "",
    rules: "",
    explenation: "",
    usersClick: [],
    clicks: 0,
  });

  const [img, setImg] = useState(null);

  auth.onAuthStateChanged((user) => {
    drill.creator_uid = user.uid;
    drill.creator_username = user.displayName;
  });

  function handleChange(event) {
    event.preventDefault();

    setDrill({ ...drill, [event.target.name]: event.target.value });

    // drill[event.target.name] = event.target.value;
  }

  function handleImg(event) {
    setImg(event.target.files[0]);
  }

  function handelSumbit() {
    let date = new Date();
    drill.date =
      date.getDate() + "/" + date.getUTCMonth() + " - " + date.getFullYear();
    // Validation
    storage
      .ref("drills/" + drill.name + auth.currentUser.uid)
      .put(img)
      .then((snapshot) => {
        console.log(snapshot);
        drill.img_url =
          "https://firebasestorage.googleapis.com/v0/b/fogtb-d2850.appspot.com/o/drills%2F" +
          drill.name +
          auth.currentUser.uid +
          "?alt=media&token=2875bb29-9b0b-4ec2-b835-68a94684d57e";
        db.collection("drills")
          .add(drill)
          .then((res) => {
            drill.id = res.id;
            db.collection("drills")
              .doc(res.id)
              .set(drill)
              .then(() => {
                window.location.replace("drill/" + drill.id);
              });
          });
      });
  }

  return (
    <div className="container">
      <div className="column">
        <h1 className="title">Övningsskaparen</h1>
        <form>
          <div className="field">
            <label htmlFor="name" className="label">Namn</label>
            <input
              type="text"
              className="input control"
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
              className="select control"
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
              className="select control"
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
              className=" textarea control"
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
              className="textarea control"
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
              className="textarea control"
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
              className="textarea control"
              placeholder="Regler, förutsättningar och kort övningsbeskrivning. Vad är uppgiften?"
              required
              onChange={handleChange}
              value={drill.rules}
            ></textarea>
          </div>
          <div className="field">
            <h3>
              <label htmlFor="img" className="label">
                {" "}
                Bild
              </label>
            </h3>
            <input
              type="file"
              name="img"
              id="img"
              className=" file control"
              onChange={handleImg}
            />
          </div>
          <button
            type="button"
            className="button control is-success"
            onClick={handelSumbit}
          >
            Spara
          </button>
        </form>
        <br />
      </div>
    </div>
  );
}

export default DrillCreator;
