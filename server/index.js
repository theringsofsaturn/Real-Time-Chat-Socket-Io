const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

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
    // We have error and user, because addUser function only two things:an object that has an error property or an object that has a user property.
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room); // join method joins a user to a room.

    // This is telling the user that he is welcoming to the chat room.
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the ${user.room} room.`,
    });

    // This is letting everybody else besides the user know that a new user has joined the chat room.
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    socket.join(user.room);

    callback();
  });

  // event listener for when a user sends a message. The Admin generated messagges are called "messages" and the user generated messages are called "sendMessage"
  socket.on("sendMessage", (message, callback) => {
    // Get user who sends that message
    const user = getUser(socket.id);

    // Specify the room that the message is going to be sent to and emit that event. "Message" is coming from the client side.
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
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
