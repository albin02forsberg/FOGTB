import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { auth, db } from "../firebase/firebase";
import "../static/navbar";

function Navbar() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);

  auth.onAuthStateChanged((user) => {
    setUser(user);
    db.collection("users")
      .where("uid", "==", auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setTeams(doc.data().teams);
        });
      });
  });

  useEffect(() => {}, [user]);

  return (
    <nav className="navbar" role="navigation" area-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          FOGTB
        </Link>
        <button
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => {
            document
              .querySelector("#navbarBasicExample")
              .classList.toggle("is-active");
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className="navbar-menu" id="navbarBasicExample">
        <div className="navbar-start">
          <div className="navbar-item">
            <Link
              onClick={() => {
                document
                  .querySelector("#navbarBasicExample")
                  .classList.toggle("is-active");
                window.location.replace("/");
              }}
            >
              Dashboard
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              onClick={() => {
                document
                  .querySelector("#navbarBasicExample")
                  .classList.toggle("is-active");
                window.location.replace("/drills");
              }}
            >
              Övningar
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              onClick={() => {
                document
                  .querySelector("#navbarBasicExample")
                  .classList.toggle("is-active");
                window.location.replace("/sessions");
              }}
            >
              Träningspass
            </Link>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <p className="navbar-link">Mina lag</p>

            <div className="navbar-dropdown">
              {teams.map((doc) => {
                return (
                  <Link
                    className="navbar-item"
                    onClick={() => {
                      window.location.replace("/team/" + doc.id);
                    }}
                  >
                    {doc.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <LoginBtn user={user} />
      </div>
    </nav>
  );
}

function LoginBtn(props) {
  if (props.user != null) {
    return (
      <div className="navbar-end">
        <div className="buttons">
          <Link
            className="button is-primary"
            onClick={() => {
              document
                .querySelector("#navbarBasicExample")
                .classList.toggle("is-active");
              window.location.replace("/user/" + auth.currentUser.uid);
            }}
          >
            {auth.currentUser.displayName}
          </Link>
          <Link
            className="button is-danger"
            onClick={() => {
              auth.signOut();
              document
                .querySelector("#navbarBasicExample")
                .classList.toggle("is-active");
              window.location.replace("/login");
            }}
          >
            Logga ut
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar-end">
        <div className="buttons">
          <Link
            className="button is-primary"
            to="/login"
            onClick={() => {
              document
                .querySelector("#navbarBasicExample")
                .classList.toggle("is-active");
            }}
          >
            Logga in
          </Link>
          <Link
            className="button is-secondary"
            to="/signup"
            onClick={() => {
              document
                .querySelector("#navbarBasicExample")
                .classList.toggle("is-active");
            }}
          >
            Skapa konto
          </Link>
        </div>
      </div>
    );
  }
}

export default React.memo(Navbar);
