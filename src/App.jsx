// Import react
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./static/App.css";

// Import components
import Dashboard from "./Components/dashboard";
import Navbar from "./Components/navbar";
import Login from "./Components/login";
import SignUp from "./Components/signup";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
