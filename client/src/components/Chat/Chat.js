import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const endpoint = "http://localhost:3000"

  let location = useLocation();


  // The first thing to do, would be to fetch the data the user has entered when joining the chat
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    // When we get the first connection we set the socket to io and pass an endpoint
    socket = io(endpoint);
    console.log(socket);

    setName(name);
    setRoom(room);
  }, [endpoint, location.search]);

  return <h1>Chat</h1>;
};

export default Chat;
