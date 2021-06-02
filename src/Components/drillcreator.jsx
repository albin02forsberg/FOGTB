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

    console.log(drill);
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
            drill.id = res.id
            db.collection("drills").doc(res.id).set(drill).then(()=>{
              window.location.replace("drill/" + drill.id);
            });
          });
      });
  }

  return (
    <div className="container">
      <div className="col-md-12">
        <h1 className="h1">Övningsskaparen</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Namn</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              placeholder="Namn på övningen"
              required
              onChange={handleChange}
              value={drill.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Typ av övning</label>
            <select
              name="type"
              className="form-control custom-select"
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
          <div className="form-group">
            <label htmlFor="level">Nivå</label>
            <select
              name="level"
              className="form-control custom-select"
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
          <div className="form-group">
            <label htmlFor="moment">Moment</label>
            <select
              name="moment"
              id="moment"
              className="form-control custom-select"
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
          <div className="form-group">
            <label htmlFor="explination">Varför?</label>
            <textarea
              name="explenation"
              id="explenation"
              cols="30"
              rows="10"
              className="form-control"
              placeholder="Ange varför detta ska tränas kopplat till vad spelaren och laget ska förstärka eller förbättra. Exempelvis: Spelövning: spela sig ur press i speluppbyggnaden. Färdighetsövning:  förbättra tillslagstekniken inför spelet"
              required
              onChange={handleChange}
              value={drill.explenation}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="description">Beskrivning</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              className="form-control"
              placeholder="Beteenden/aktioner som gör att övningens vad uppfylls. För spelövning: Vad prioriteras i de aktuella skedena?  När ska spelarna agera? Vilket arbetssätt ska spelarna tillämpa? För färdighetsövning: Ange när och hur spelaren ska agera. Driv bollen framåt för att erövra tom yta."
              required
              onChange={handleChange}
              value={drill.description}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="organization">Organisation</label>
            <textarea
              name="organization"
              id="organization"
              cols="30"
              rows="10"
              className="form-control"
              placeholder="Antal spelare (inklusive målvakter och jokrar), yta eller spelplan med mål, bollar, koner och västar. För spelövning: Lagens formation."
              required
              onChange={handleChange}
              value={drill.organization}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="rules">Anvisningar</label>
            <textarea
              name="rules"
              id="rules"
              cols="30"
              rows="10"
              className="form-control"
              placeholder="Regler, förutsättningar och kort övningsbeskrivning. Vad är uppgiften?"
              required
              onChange={handleChange}
              value={drill.rules}
            ></textarea>
          </div>
          <div className="form-group">
            <h3>
              <label htmlFor="img">Bild</label>
            </h3>
            <input
              type="file"
              name="img"
              id="img"
              className="form-control"
              onChange={handleImg}
            />
          </div>
          <br />
          <br />
          <button
            type="button"
            className="btn btn-success form-control"
            onClick={handelSumbit}
          >
            Spara
          </button>
        </form>
      </div>
    </div>
  );
}

export default DrillCreator;
