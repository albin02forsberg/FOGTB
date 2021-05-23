import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <div className="row">
        <div className="col-md-12">
          <div className="display-2">Logga in</div>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Lösenord</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={() =>{
                console.log(email, password);
              }}>
                Logga in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
