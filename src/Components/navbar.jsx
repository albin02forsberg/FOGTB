import React from "react";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
      <div class="container-fluid">
        <Link className="navbar-brand" to="/">FOGTB</Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo2"
          aria-controls="navbarTogglerDemo2"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse show" id="navbarTogglerDemo2">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Flöde
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/drillcreator">
                Övningskaparen
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sessionplanner">
                Träningsplaneraren
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav my-2 my-lg-0">
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
