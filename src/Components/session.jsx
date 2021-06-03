import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase/firebase";

function Session() {
  const { id } = useParams();
  const [session, setSession] = useState({});

  useEffect(() => {
    db.collection("sessions")
      .doc(id)
      .get()
      .then((snapshot) => {
        setSession(snapshot.data());
      });
  }, [id]);

//   useEffect(() => {
//     session.drills.forEach((drill) => {
//       db.collection("drills")
//         .doc(drill)
//         .get()
//         .then((snapshot) => {
//           setD((arr) => [...arr, snapshot.data()]);
//         });
//     });
//   }, [session]);

  return (
    <div className="container">
      <h1 className="h1">{id}</h1>
      <p>{JSON.stringify(session)}</p>
      {/* <p>{JSON.stringify(d)}</p> */}
    </div>
  );
}

export default Session;
