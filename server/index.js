const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  // When a user connects to the server through socket.io (browser) this function is called and the socket is passed in as an argument to the function. The socket will be connected as client side socket.);
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
  socket.on("chat message", (msg) => {
    console.log("Message: " + msg);
    io.emit("chat message", msg);
  });

  app.use(router);

  server.listen(PORT, () => {
    console.log(`listening on port ${3001}`);
  });
});
