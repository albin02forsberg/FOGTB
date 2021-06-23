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
        <div className="column">
          <h1 className="title">{player.name}</h1>
      </div>
    </div>
  );
}

export default Player;
