import React, { useState } from "react";
import { auth, db } from "../firebase/firebase";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [err, setErr] = useState("");

  if (auth.currentUser) {
    window.location.replace("/");
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      window.location.replace("/");
    }
  });

  const handleChange = (event) => {
    event.preventDefault();
    let e = event.target;
    if (e.name === "email") {
      setEmail(e.value.trim());
    }
    if (e.name === "username") {
      setUsername(e.value);
    }
    if (e.name === "lastName") {
      setLastName(e.value);
    }
    if (e.name === "firstName") {
      setFirstName(e.value);
    }
    if (e.name === "password1") {
      setPass1(e.value);
    }
    if (e.name === "password2") {
      setPass2(e.value);
    }
  };
  return (
    <div className="container">
      <div className="column">
        <h1 className="title">Skapa konto</h1>
      </div>
      <div className="column">
        <form>
          <div className="field">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="control input"
              onChange={handleChange}
              value={email}
            />
          </div>
          <div className="field">
            <label htmlFor="firstName" className="label">Förnamn</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="control input"
              value={firstName}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="lastName" className="label">Efternamn</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="control input"
              value={lastName}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="username" className="label">Användarnamn</label>
            <input
              type="text"
              name="username"
              id="username"
              className="control input"
              onChange={handleChange}
              value={username}
            />
          </div>
          <div className="field">
            <label htmlFor="password1" className="label">Lösenord</label>
            <input
              type="password"
              name="password1"
              id="password1"
              onChange={handleChange}
              className="control input"
              value={pass1}
            />
          </div>
          <div className="field">
            <label htmlFor="password2" className="label">Bekräfta lösenord</label>
            <input
              type="password"
              name="password2"
              id="password2"
              onChange={handleChange}
              className="control input"
              value={pass2}
            />
          </div>
          <button
            type="button"
            className="button is-primary"
            onClick={() => {
              // auth
              //   .createUserWithEmailAndPassword(email, pass1)
              //   .then((result) => {
              //     console.log(result);
              //     result.user.updateProfile({
              //       displayName: username,
              //     }))
              auth
                .createUserWithEmailAndPassword(email, pass1)
                .then((result) => {
                  result.user
                    .updateProfile({
                      displayName: username,
                    })
                    .then(() => {
                      db.collection("users")
                        .doc(result.user.uid)
                        .set({
                          username: result.user.displayName,
                          firstName: firstName,
                          lastName: lastName,
                          uid: result.user.uid,
                          drills: [],
                          sessions: [],
                          teams: [],
                        })
                        .then(window.location.replace("/"));
                    });
                })
                .catch((err) => setErr(err.message));
            }}
          >
            Skapa konto
          </button>
        </form>
        {err}
      </div>
    </div>
  );
}

export default SignUp;
