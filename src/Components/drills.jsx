import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
// Components
// import Card from "./card";

function Drills() {
  const [drills, setDrills] = useState([]);
  const[displayDrills, setDisplayDrills] = useState([]);
  const [sort, setSort]= useState("name");

  // const [counter, setCounter] = useState(0);

  useEffect(() => {
    db.collection("drills")
      .orderBy("clicks", "desc")
      .orderBy("name", "asc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          // drills.push(doc.data());
          setDrills((arr) => [...arr, doc.data()]);
          setDisplayDrills((arr)=> [...arr, doc.data()]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
      setDisplayDrills([]);

      drills.reduce((reducer, current)=>{

        if(current.level == sort){
          console.log(current)
          setDisplayDrills(arr => [...arr, current]);
        }
      }, [])
  }, [sort])

  return (
      <div className="container">
        <p className="title">Övningar</p>
        <hr />
        <button className="button-primary" onClick={()=>{
          window.location.replace("/drillcreator")
        }}>
          Skapa övning
        </button>
        <button onClick={()=>{
          setSort("5 mot 5");
        }}>
          Test
        </button>
        <from className="form-inline">
          <div className="form-group">
            <label htmlFor="level" className="label">Nivå</label>
            <select name="level" id="level" className="form-control" onChange={(e)=>{
              setSort(e.target.value)
            }}>
              <option value="11 mot 11">11 mot 11</option>
              <option value="11 mot 11">9 mot 9</option>
              <option value="11 mot 11">7 mot 7</option>
              <option value="11 mot 11">5 mot 5</option>
            </select>
          </div>
        </from>
        <hr />
        <div className="column">
          {/* <aside className="menu">
            <p className="menu-label">Övningar</p>
            <ul className="menu-list">
              {drills.map((doc) => {
                return (
                  <li>
                    <Link to={"/drill/" + doc.id} className="is-link">
                      {doc.name} - {doc.level} - {doc.type}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside> */}
          <div className="table-container">
            <table className="table is-striped is-hoverable is-fullwidth">
              <thead>
                <th>Namn</th>
                <th>Nivå</th>
                <th>Typ</th>
                <th>Moment</th>
              </thead>
              <tbody>
                {displayDrills.map((doc) => {
                  return (
                    <tr
                      onClick={() => {
                        window.location.replace("/drill/" + doc.id);
                      }}
                    >
                      <td>
                        <Link to={"/drill/" + doc.id}>{doc.name}</Link>
                      </td>
                      <td>{doc.level}</td>
                      <td>{doc.type}</td>
                      <td>{doc.moment}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}

export default Drills;
