import React from "react";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          FOGTB
        </a>
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
              <a className="nav-link" href="/">
                Flöde
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/drillcreator">
                Övningskaparen
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/sessionplanner">
                Träninsplaneraren
              </a>
            </li>
          </ul>
          <ul className="navbar-nav my-2 my-lg-0">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <a href="/login" className="nav-link">Logga in</a>
              </li>
              <li className="nav-item">
                  <a href="/signup" className="nav-link">Skapa konto</a>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
