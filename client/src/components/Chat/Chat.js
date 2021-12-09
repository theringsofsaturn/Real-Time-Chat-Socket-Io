import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const endpoint = "http://localhost:3001";

  let location = useLocation();

  // The first thing to do, would be to fetch the data the user has entered when joining the chat
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    let socket = io.connect(endpoint, { transports: ["websocket"] });
    console.log(socket);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {
        
    });
    // Unmounting life cycle for a disconnect event
    return () => {
      // In the backend we have a disconnect event. Here we can emit that disconnect event. The name "disconnect" must be the same as in the backend.
      socket.emit("disconnect");
      socket.off(); // It will turn the socket off.
    };

  }, [endpoint, location.search]); // We only want to run this effect when the endpoint or the search changes

  return <h1>Chat</h1>;
};

export default Chat;
