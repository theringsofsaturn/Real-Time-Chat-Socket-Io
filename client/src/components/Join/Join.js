// When a user joins, a connection request is going to be sent to the server.
// When a user leaves, a disconnection request is going to be sent to the server.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./join.css";

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        {/* We are gonna use the Link component to navigate to the chat.js page. We are gonna pass the name and room parameters as props (we'll use query-string to pass data in the url). 
        name is = to the name state.
        room is = to the room state. 
        With this, we'll be able to read the name and room from our chat component 
        *First we need to prevent the user to click the button to transfer to chat application, if he didn't specify the name or the room, because that would break the application. preventDefault will prevent button click on this Link*/}

        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={"button mt-20"} type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
