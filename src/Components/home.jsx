import React from "react";

import Card from "./card";

function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-2">Övningsbank</h1>
        </div>
        <div className="col-md-12">
          <hr/>
          <div
            class="btn-group btn-group-lg"
            role="group"
            aria-label="Basic example"
          >
            <button type="button" class="btn btn-dark">
              Övningar
            </button>
            <button type="button" class="btn btn-dark">
              Träningspass
            </button>
          </div>
          <hr/>
        </div>
      </div>
      <div className="col-md-12">
        <div className="card-columns">
          <Card title={"Test"} />
          <Card title={"Test"} />
          <Card title={"Test"} />
          <Card title={"Test"} />
          <Card title={"Test"} />
          <Card title={"Test"} />
          <Card title={"Test"} />
          <Card title={"Test"} />
          <Card title={"Test"} />
          <Card title={"Test"} />
          <Card title={"Test"} />
          <Card title={"Test"} />
        </div>
      </div>
    </div>
  );
}

export default Home;
