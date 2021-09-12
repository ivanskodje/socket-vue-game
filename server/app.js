const Express = require("express")();
const Http = require("http").Server(Express);
const SocketIO = require("socket.io")(Http, {
  cors: {
    origin: "*",
  },
});

// Server side data
var position = {
  x: 200,
  y: 200,
};

SocketIO.on("connection", (socket) => {
  socket.emit("position", position);
  socket.on("move", (data) => {
    switch (data) {
      case "left":
        position.x -= 25;
        SocketIO.emit("position", position);
        break;
      case "right":
        position.x += 25;
        SocketIO.emit("position", position);
        break;
      case "up":
        position.y -= 25;
        SocketIO.emit("position", position);
        break;
      case "down":
        position.y += 25;
        SocketIO.emit("position", position);
        break;
    }
  });
});

Http.listen(3000, () => {
  console.log("Listening at port 3000... ");
});
