import React, {  useState } from "react";

import { Link } from "react-router-dom";

import { auth } from "../firebase/firebase";

function Navbar() {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((u) => {
    setUser(u);
  });
  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          FOGTB
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo2"
          aria-controls="navbarTogglerDemo2"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse show" id="navbarTogglerDemo2">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/drills">
                Övningar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sessions">
                Träningspass
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav my-2 my-lg-0">
            <LoginBtn user={user} />
          </ul>
        </div>
      </div>
    </nav>
  );
}

function LoginBtn(props) {
  if (props.user != null) {
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to={"/user/" + auth.currentUser.uid}>
            {auth.currentUser.displayName}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            onClick={() => {
              auth.signOut();
              sessionStorage.setItem("user", null);
            }}
            to="/login"
          >
            Logga ut
          </Link>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Logga in
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            Skapa konto
          </Link>
        </li>
      </ul>
    );
  }
}

export default Navbar;
