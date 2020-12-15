import React, { useEffect, useState } from "react";
import "./SidebarChat.css";

// Material UI
import { Avatar } from "@material-ui/core";

import db from "./Firebase";

import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  // database stuff
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  // Used for random avatars
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  // function executed when a new room is created
  const createChat = () => {
    const roomName = prompt("Enter the name of Room");
    if (roomName) {
      // adding to the database
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    // All the existing rooms in the db
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    // create a new room in db
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
