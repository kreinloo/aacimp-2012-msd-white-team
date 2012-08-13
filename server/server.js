/*

  server.js

  Basic server for our tank game, it should just broadcast the messages
  in the beginning and then we can move forward from here.

*/

var io = require("socket.io").listen(8000);
var Map = require("../client/js/map.js");
var Tank = require("../client/js/tank.js");
var Bullet = require("../client/js/bullet.js");
var Brick = require("../client/js/brick.js");

var COMMON = require("../client/js/common.js");
var TYPE = COMMON.TYPE;
var MESSAGE = COMMON.MESSAGE;
var MAP = COMMON.MAP;
var EVENT = COMMON.EVENT;

function Server () {
  this.map = new Map();
  this.initialize();
}

Server.prototype.initialize = function () {
  this.map.addObject(new Brick({
    sizeX: 60,
    sizeY: 1,
    isDestructible: false
  }));
  this.map.addObject(new Brick({
    sizeX: 60,
    sizeY: 1,
    y: 35,
    isDestructible: false
  }));
  this.map.addObject(new Brick({
    sizeX: 1,
    sizeY: 34,
    y: 1,
    isDestructible: false
  }));
  this.map.addObject(new Brick({
    sizeX: 1,
    sizeY: 34,
    y: 1,
    x: 59,
    isDestructible: false
  }));

  var i, j, random, brick;
  for (i = 0; i < 33; i += 3 ) {
    for (j = 0; j < 57; j += 3) {
      random = Math.floor(Math.random()*8);
      switch (random) {
        case 0:
          brick = new Brick({
            x: j,
            y: i,
            type: TYPE.FOREST,
            isPenetrable: true,
            isDestructible: false
          });
          this.map.addObject(brick);
          break;
        case 1:
          brick = new Brick({
            x: j,
            y: i,
            type: TYPE.WALL,
            sizeX: Math.floor(Math.random() * 2) + 1,
            sizeY: Math.floor(Math.random() * 2) + 1,
            isDestructible: false
          });
          this.map.addObject(brick);
          break;
        case 2:
          brick = new Brick({
            x: j + Math.floor(Math.random() * 3),
            y: i + Math.floor(Math.random() * 3),
            type: TYPE.STONE,
            sizeX: 1,
            sizeY: 1
          });
          this.map.addObject(brick);
          break;
        default:
          //nothing to add
          break;
      }
    }
  }
}

Server.prototype.fullUpdateRequest = function (socket) {

  console.log("full update for " + socket.id);

  var playerID;
  while(true) {
    playerID = this.map.addObject(new Tank ({
      x: Math.floor(Math.random() * MAP.SIZE_X),
      y: Math.floor(Math.random() * MAP.SIZE_Y)
    }));
    if (playerID !== null) break;
  }

  var objs = [];

  var obj;
  for (var objKey in this.map.objects) {
    obj = this.map.objects[objKey];

    objs.push({

      uid: obj.uid,
      x: obj.x,
      y: obj.y,
      type: obj.type,
      xVel: obj.xVel,
      yVel: obj.yVel,
      sizeX: obj.sizeX,
      sizeY: obj.sizeY,
      direction: obj.direction,

      isMoving: obj.isMoving,
      needsRendering: true,
      isDestructible: obj.isDestructible,
      isPenetrable: obj.isPenetrable,
      hp: obj.hp,

      tankId: obj.tankId

    });
  }

  socket.emit(MESSAGE.FULL_UPDATE, JSON.stringify(objs));

  socket.emit(MESSAGE.PLAYER_ID, {
    id: playerID
  });

  // new tank!

  var playerTank = this.map.objects[playerID];
  socket.broadcast.emit(MESSAGE.PARTIAL_UPDATE, {
    event: EVENT.NEW_TANK,
    obj: {
      uid: playerTank.uid,
      x: playerTank.x,
      y: playerTank.y,
      type: playerTank.type,
      xVel: playerTank.xVel,
      yVel: playerTank.yVel,
      sizeX: playerTank.sizeX,
      sizeY: playerTank.sizeY,
      direction: playerTank.direction,

      isMoving: playerTank.isMoving,
      needsRendering: true,
      isDestructible: playerTank.isDestructible,
      isPenetrable: playerTank.isPenetrable,
      hp: playerTank.hp,

      tankId: playerTank.tankId
    }
  });

}

Server.prototype.partialUpdate = function (socket, data) {

  console.log("RECV: PARTIAL_UPDATE");

  var obj;
  if (data.event === EVENT.MOVE) {

    obj = this.map.objects[data.uid];
    obj.x = data.x;
    obj.y = data.y;
    obj.direction = data.direction;

  }
  socket.broadcast.emit(MESSAGE.PARTIAL_UPDATE, data);

};

var server = new Server();

io.sockets.on("connection", function (socket) {

  console.log("new connection");

  socket.on(MESSAGE.FULL_UPDATE, function (data) {
    server.fullUpdateRequest(socket);
    socket.broadcast.emit(MESSAGE.CONNECT, data);
  });

  socket.on(MESSAGE.PARTIAL_UPDATE, function (data) {
    server.partialUpdate(socket, data);
  });

  socket.on(MESSAGE.GAME_UPDATE, function (data) {
    socket.broadcast.emit(MESSAGE.GAME_UPDATE, data);
  });

  socket.on("disconnect", function (data) {
    socket.broadcast.emit(MESSAGE.DISCONNECT, data);
  });


});
