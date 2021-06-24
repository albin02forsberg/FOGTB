import React, { useState } from "react";

function CreateTraining() {
  // const [training, setTraining] = useState({
  //   date: "",
  //   time: "",
  //   place: "",
  // });

  return (
    <div className="container">
      <div className="column">
        <h1 className="title">Lägg till träning</h1>

        <form>
          <div className="field">
            <label htmlFor="date" className="label">
              Datum
            </label>
            <input
              type="date-time"
              name="date"
              id="date"
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
              className="control input is-fullwidth"
            />
          </div>
          <div className="field">
            <button className="button is-primary">Spara</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTraining;
