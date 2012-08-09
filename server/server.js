/*

  server.js

  Basic server for our tank game, it should just broadcast the messages
  in the beginning and then we can move forward from here.

*/

var io = require("socket.io").listen("8000")

/*
io.sockets.on("connection", function (socket) {

  socket.on(MESSAGE.CONNECT, function (data) {
    socket.broadcast.emit(MESSAGE.CONNECT, data);
  });

  socket.on(MESSAGE.GAME_UPDATE, function (data) {
    socket.broadcast.emit(MESSAGE.GAME_UPDATE, data);
  });

  socket.on("disconnect", function (data) {
    socket.broadcast.emit(MESSAGE.DISCONNECT, data);
  });


});
*/
