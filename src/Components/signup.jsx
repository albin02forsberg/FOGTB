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
      <div className="row">
        <div className="col-md-12">
          <h1 className="h1">Skapa konto</h1>
        </div>
        <div className="col-md-12">
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">Förnamn</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
                value={firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Efternamn</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
                value={lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Användarnamn</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                onChange={handleChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password1">Lösenord</label>
              <input
                type="password"
                name="password1"
                id="password1"
                onChange={handleChange}
                className="form-control"
                value={pass1}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Bekräfta lösenord</label>
              <input
                type="password"
                name="password2"
                id="password2"
                onChange={handleChange}
                className="form-control"
                value={pass2}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
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
    </div>
  );
}

export default SignUp;
