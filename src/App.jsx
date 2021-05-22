// Import react
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./static/App.css";

// Import components
import Home from "./Components/home";
import Navbar from "./Components/navbar";
import Login from "./Components/login";

function App() {
  return (
    // <Home/>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
