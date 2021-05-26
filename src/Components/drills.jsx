import React from 'react'

function Drills() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="h1">Övningar</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div
              className="btn-group btn-group-lg"
              role="group"
              aria-label="Basic example"
            >
              <button type="button" className="btn btn-secondary">
                Övningar
              </button>
              <button type="button" className="btn btn-secondary">
                Träningspass
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Drills
