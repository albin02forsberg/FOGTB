import React, { useState } from "react";

import { auth } from "../firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }

    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
  };

  return (
    <div className="container">
      <div className="column">
        <div className="title">Logga in</div>
        <form>
          <div className="field">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="control input"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password" className="label">Lösenord</label>
            <input
              type="password"
              name="password"
              id="password"
              className="control input"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <button
              type="button"
              className="button is-primary"
              onClick={() => {
                auth
                  .signInWithEmailAndPassword(email, password)
                  .then(() => {
                    window.location.replace("/");
                  })
                  .catch((err) => {
                    setError(err.message);
                  });
              }}
            >
              Logga in
            </button>
          </div>
          {error}
        </form>
      </div>
    </div>
  );
}

export default Login;
