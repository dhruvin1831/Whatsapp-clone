import React from "react";
import "./Chat.css";
import { useEffect, useState } from "react";

// Material UI
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

import { useParams } from "react-router-dom";
import db from "./Firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
// import axios from "./axios";

function Chat() {
  // To store message in the variable input
  const [input, setInput] = useState("");

  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");

  const [messages, setMessages] = useState([]);
  
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //  await axios.post('/messages/new', {
  //     message: input,
  //     name: 'Dhruvin',
  //     timestamp: 'just now',
  //     received: false,

  //   })

  //   setInput('');
  // };

  // When the enter key is hit after entering the new message
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("something is typed>>>>", input);

    // Adding the message to the db
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last Seen at -{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {/* <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__receiver"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div> */}
      <div className="chat__body">
        {/* messages from the db */}
        {messages.map((message) => (
          <p
            className={`chat__message ${
              user.displayName == message.name && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />

        {/* Enter a new message */}
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
