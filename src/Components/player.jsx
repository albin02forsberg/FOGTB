import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase/firebase";

function Player() {
  const { id } = useParams();
  const [player, setPlayer] = useState({});

  useEffect(() => {
   db.collection("players").doc(id).get().then((snapshot)=>{
       setPlayer(snapshot.data());
   })
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="h1">{player.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default Player;
