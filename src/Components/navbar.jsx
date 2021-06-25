import React, { useState } from "react";

import { Link } from "react-router-dom";

import { auth } from "../firebase/firebase";
import "../static/navbar";

function Navbar() {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((u) => {
    setUser(u);
  });
  return (
    // <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
    //   <div className="container-fluid">
    //     <Link className="navbar-brand" to="/">
    //       FOGTB
    //     </Link>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarTogglerDemo2"
    //       aria-controls="navbarTogglerDemo2"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse show" id="navbarTogglerDemo2">
    //       <ul className="navbar-nav mr-auto">
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/">
    //             Dashboard
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/drills">
    //             Övningar
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/sessions">
    //             Träningspass
    //           </Link>
    //         </li>
    //       </ul>
    //       <ul className="navbar-nav my-2 my-lg-0">
    //         <LoginBtn user={user} />
    //       </ul>
    //     </div>
    //   </div>
    // </nav>

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
              to="/"
              onClick={() => {
                document
                  .querySelector("#navbarBasicExample")
                  .classList.toggle("is-active");
              }}
            >
              Dashboard
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              to="/drills"
              onClick={() => {
                document
                  .querySelector("#navbarBasicExample")
                  .classList.toggle("is-active");
              }}
            >
              Övningar
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              to="/sessions"
              onClick={() => {
                document
                  .querySelector("#navbarBasicExample")
                  .classList.toggle("is-active");
              }}
            >
              Träningspass
            </Link>
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
            to={"/user/" + auth.currentUser.uid}
            onClick={() => {
              document
                .querySelector("#navbarBasicExample")
                .classList.toggle("is-active");
            }}
          >
            {auth.currentUser.displayName}
          </Link>
          <Link
            className="button is-danger"
            onClick={() => {
              auth.signOut();
              sessionStorage.setItem("user", null);
              document
                .querySelector("#navbarBasicExample")
                .classList.toggle("is-active");
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

export default Navbar;
