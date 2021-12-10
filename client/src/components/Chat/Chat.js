import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import "./chat.css";

const endpoint = "http://localhost:3001";

let socket;

const Chat = () => {
  let location = useLocation();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState(""); // This is to specify every single message
  const [messages, setMessages] = useState([]); // This is to store all mesages

  // The first thing to do, would be to fetch the data the user has entered when joining the chat
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io.connect(endpoint, { transports: ["websocket"] });

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});
    // Unmounting life cycle for a disconnect event
    return () => {
      // In the backend we have a disconnect event. Here we can emit that disconnect event. The name "disconnect" must be the same as in the backend.
      socket.emit("disconnect");
      socket.off(); // It will turn the socket off.
    };
  }, [endpoint, location.search]); // Run this effect only when the endpoint or the search changes

  useEffect(() => {
    // "message" in the backend is sending a payload of user and a text. This is going to be the (message)  as parameter in the callback function here.
    // We have a state to store and keep track of all the messages.
    socket.on("message", (message) => {
      // We can push all these messages to our messages array.
      // Since we cannot mutate state, we spread all other messages and add one message on it. Basically we are adding a new message (sent by admin or by anyone else) to the messages array.
      setMessages([...messages, message]);
    });
  }, [messages]); // Run this effect only when the messages array changes

  // Function for sending messagges
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      // our emit listener is on the backend and it is listening to the "sendMessage" event and then it sends it to the whole server or the room. It has three parameters ("sendMessage", (message, callback)).
      // Callback will clean our message (setMessage to empty string).
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log("Message", message, "Messages", messages);

  return (
    <div className="outerContainer" >
      <div className="container" >
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer  />
    </div>
  );
};

export default Chat;
