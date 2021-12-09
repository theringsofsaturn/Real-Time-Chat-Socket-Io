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

  socket.on("join", ({ name, room }) => {
    console.log(name, room);
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
