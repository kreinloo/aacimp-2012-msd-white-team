/*

  server.js

  Basic server for our tank game, it should just broadcast the messages
  in the beginning and then we can move forward from here.

*/

var simplelogger = require("simplelogger").simplelogger;
var logger = new simplelogger({
  filename: "error.log",
  autolog: ["file"]
});

process.addListener("uncaughtException", function (err) {
  logger.error("Uncaught exception: " + err);
  console.trace();
});

var io = require("socket.io").listen(8008);

io.configure(function () {
  io.set("log level", 1);
  /*
  io.enable("browser client minification");
  io.enable("browser client etag");
  io.enable("browser client gzip");
  */
  io.set("transports", [
    "websocket",
    "flashsocket",
    "htmlfile",
    "xhr-polling",
    "jsonp-polling"
  ]);
  io.set("heartbeat timeout", 15);
  io.set("heartbeat interval", 10);
});

io.listen(8008);

var Map = require("../client/js/map.js");
var Tank = require("../client/js/tank.js");
var Bullet = require("../client/js/bullet.js");
var Brick = require("../client/js/brick.js");

var COMMON = require("../client/js/common.js");
var TYPE = COMMON.TYPE;
var MESSAGE = COMMON.MESSAGE;
var MAP = COMMON.MAP;
var EVENT = COMMON.EVENT;

var clients = {};
var DEBUG = true;

function Server () {
  this.map = new Map();
  this.map.initialize();
  this.map.server = this;
  this.gid = null;
  this.initialize();
  this.messageQueue = [];
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
  for (i = 0; i < 33; i += 6 ) {
    for (j = 0; j < 57; j += 6) {
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
            isDestructible: false,
            isPenetrable: false
          });
          this.map.addObject(brick);
          break;
        case 2:
          brick = new Brick({
            x: j + Math.floor(Math.random() * 3),
            y: i + Math.floor(Math.random() * 3),
            type: TYPE.STONE,
            sizeX: 1,
            sizeY: 1,
            isDestructible: true,
            isPenetrable: false
          });
          this.map.addObject(brick);
          break;
        default:
          //nothing to add
          break;
      }
    }
  }

  var res;
  res = "";
  for (j = 0; j < 16; j++) {
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    res += i;
  }
  this.gid = res;
  console.log(this.gid);
};

Server.prototype.fullUpdateRequest = function (socket) {

  var self = this;
  console.log("FULL_UPDATE " + socket.id);

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

  if (DEBUG) {
    console.log("SENDING FULL UPDATE " + socket.id);
    console.log(objs);
  }
  socket.emit(MESSAGE.FULL_UPDATE, {
    gid: self.gid,
    data: objs
  });

  setTimeout(function () {

    var playerID;
    var tank = new Tank ();
    while(true) {
      tank.x = Math.abs(Math.floor(Math.random() * MAP.SIZE_X - 3));
      tank.y = Math.abs(Math.floor(Math.random() * MAP.SIZE_Y - 3));
      playerID = self.map.addObject(tank);
      if (playerID !== null) break;
    }

    var playerTank = self.map.objects[playerID];

    var msg = {
      gid: self.gid,
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
    };

    if (DEBUG) {
      console.log("INITIAL TANK " + socket.id);
      console.log(msg);
    }

    io.sockets.emit(MESSAGE.PARTIAL_UPDATE, msg);

    setTimeout(function () {
      socket.emit(MESSAGE.PLAYER_ID, {
        gid: self.gid,
        id: playerID
      });

      if (DEBUG) {
        console.log("PLAYER ID " + socket.id);
        console.log({
          gid: self.gid,
          id: playerID
        });
      }
    }, 500);

    clients[socket.id] = playerID;

  }, 1000);

};

Server.prototype.partialUpdate = function (socket, data) {

  console.log("RECV: PARTIAL_UPDATE " + socket.id);
  if (DEBUG) console.log(data);

  var self = this;
  if (data.event === EVENT.MOVE) {
    var obj = this.map.objects[data.uid];
    if (!obj || data.x < 0 || data.y < 0 || data.x >= 60 || data.y >= 36) {
      if (DEBUG) {
        console.log("BAD DATA: " + socket.id);
        console.log(data);
      }
      return;
    }
    this.map.updateObjectPosition(data);
    socket.broadcast.emit(MESSAGE.PARTIAL_UPDATE, data);
  }

  else if (data.event == EVENT.SHOT) {
    var tank = this.map.objects[data.tankId];
    if (!tank) { console.log("THIS SHOULD NEVER HAPPEN!"); return; }

    var bullet = new Bullet (tank);
    bullet.direction = data.direction;
    this.map.addObject(bullet);
    data.bulletId = bullet.uid;
    io.sockets.emit(MESSAGE.PARTIAL_UPDATE, data);
  }

};

Server.prototype.disconnectHandler = function (socket) {
  console.log("RECV: DISCONNECT HANDLER " + socket.id);
  var self = this;
  var tank = this.map.objects[clients[socket.id]];
  if (!tank) { return; }
  this.map.removeObject(tank);
  socket.broadcast.emit(MESSAGE.PARTIAL_UPDATE, {
    gid: self.gid,
    event: EVENT.DESTROY_OBJECT,
    uid: tank.uid
  });
  delete clients[socket.id];
};

Server.prototype.tankRequest = function (socket) {

  var playerID;
  var tank = new Tank ();
  while(true) {
    tank.x = Math.abs(Math.floor(Math.random() * MAP.SIZE_X - 3));
    tank.y = Math.abs(Math.floor(Math.random() * MAP.SIZE_Y - 3));
    playerID = this.map.addObject(tank);
    if (playerID !== null) break;
  }

  tank = this.map.objects[playerID];
  var self = this;
  io.sockets.emit(MESSAGE.PARTIAL_UPDATE, {
    gid: self.gid,
    event: EVENT.NEW_TANK,
    obj: {
      uid: tank.uid,
      x: tank.x,
      y: tank.y,
      type: tank.type,
      xVel: tank.xVel,
      yVel: tank.yVel,
      sizeX: tank.sizeX,
      sizeY: tank.sizeY,
      direction: tank.direction,
      isMoving: tank.isMoving,
      needsRendering: true,
      isDestructible: tank.isDestructible,
      isPenetrable: tank.isPenetrable,
      hp: tank.hp,
      tankId: tank.tankId
    }
  });

  setTimeout(function () {
    socket.emit(MESSAGE.PLAYER_ID, {
      gid: self.gid,
      id: playerID
    });
    clients[socket.id] = playerID;
  }, 500);

};

Server.prototype.emitUpdate = function (msg, data) {
  data.gid = this.gid;
  if (DEBUG) {
    console.log("BROADCAST: ");
    console.log(data);
  }
  io.sockets.emit(msg, data);
};

server = new Server();
map = server.map;

io.sockets.on("connection", function (socket) {

  socket.on(MESSAGE.FULL_UPDATE, function (data) {
    server.fullUpdateRequest(socket);
  });

  socket.on(MESSAGE.PARTIAL_UPDATE, function (data) {
    if (data.gid !== server.gid) { return; }
    server.partialUpdate(socket, data);
  });

  socket.on(MESSAGE.TANK_REQUEST, function (data) {
    if (data.gid !== server.gid) { return; }
    server.tankRequest(socket);
  });

  socket.on("disconnect", function (data) {
    server.disconnectHandler(socket);
  });

});

setInterval(function () {
  server.map.updateObjects();
}, 150);

setInterval(function () {
  server.map.updateBullets();
}, 30);

setInterval(function () {
  if (server.messageQueue.length === 0) { return; }
  server.messageQueue.reverse();
  server.emitUpdate(MESSAGE.UPDATES, {
    data: server.messageQueue
  });
  server.messageQueue = [];
}, 75);
