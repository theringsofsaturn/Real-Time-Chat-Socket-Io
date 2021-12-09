const express = require("express");

const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = 3001;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on("connection", (socket) => {
  // When a user connects to the server through socket.io (browser) this function is called and the socket is passed in as an argument to the function. The socket will be connected as client side socket.);
  console.log("New client connected");

  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);
    // With a callback we can trigger some response immediately after the socket.on event ("join") has been emitted. Here we can do some error handling.
    // We can have acces to this function here as a third parameter in the socket.emit in the client (Chat.js)
    // const error = true;
    // if (error) {
    //   return callback({error: "Error"});
    // }
  });
  // In this case, socket.on not io because we have a specific socket (the one as parameter) that disconnects.
  socket.on("disconnect", () => console.log("Client disconnected"));
  // socket.on("chat message", (msg) => {
  //   console.log("Message: " + msg);
  //   io.emit("chat message", msg);
  // });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
