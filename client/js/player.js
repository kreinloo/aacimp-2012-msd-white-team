/*

  player.js

*/

function Player (tankId) {
  this.tank = map.objects[tankId];
  this.tank.domElement.removeClass("tank");
  this.tank.domElement.addClass("tank-user");
    this.tank.domElement.append('<div id="t'+ tankId + '"></div>');
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '#t' + tankId + '{ position: absolute; background-color: green;    left : 0%;    width : 100%;    height : 10%;    top: 30; }';
    document.getElementsByTagName('head')[0].appendChild(style);
}

Player.prototype = {
  name: null,
  tank: null,
  oldX: null,
  oldY: null,
  lastShot: new Date().getTime()
};

Player.prototype.moveTank = function (direction) {
  if (this.tank.isMoving) { return; }
  switch (direction) {
    case DIRECTION.NORTH:
      this.tank.xVel = 0;
      this.tank.yVel = -1;
      this.tank.direction = DIRECTION.NORTH;
      break;
    case DIRECTION.SOUTH:
      this.tank.xVel = 0;
      this.tank.yVel = +1;
      this.tank.direction = DIRECTION.SOUTH;
      break;
    case DIRECTION.EAST:
      this.tank.xVel = +1;
      this.tank.yVel = 0;
      this.tank.direction = DIRECTION.EAST;
      break;
    case DIRECTION.WEST:
      this.tank.xVel = -1;
      this.tank.yVel = 0;
      this.tank.direction = DIRECTION.WEST;
      break;
  }
  this.tank.isMoving = true;
};

Player.prototype.moveUp = function () {
  this.moveTank(DIRECTION.NORTH);
};

Player.prototype.moveDown = function () {
  this.moveTank(DIRECTION.SOUTH);
};

Player.prototype.moveLeft = function () {
  this.moveTank(DIRECTION.WEST);
};

Player.prototype.moveRight = function () {
  this.moveTank(DIRECTION.EAST);
};

Player.prototype.stop = function () {
  this.tank.xVel = 0;
  this.tank.yVel = 0;
  this.tank.isMoving = false;
  if (this.tank.x !== this.oldX || this.tank.y !== this.oldY) {
    this.tank.x = this.oldX;
    this.tank.y = this.oldY;
    socket.emit(MESSAGE.PARTIAL_UPDATE, {
      event: EVENT.MOVE,
      uid: this.tank.uid,
      x: this.tank.x,
      y: this.tank.y,
      direction: this.tank.direction
    });
  }
};

Player.prototype.shoot = function () {

  var d = new Date().getTime();
  if (d - this.lastShot < 750) { return; }

  sound = document.getElementById("shoot");
  sound.play();
  socket.emit(MESSAGE.PARTIAL_UPDATE, {
    event: EVENT.MOVE,
    uid: this.tank.uid,
    x: this.tank.x,
    y: this.tank.y,
    direction: this.tank.direction
  });
  socket.emit(MESSAGE.PARTIAL_UPDATE, {
    event: EVENT.SHOT,
    tankId: this.tank.uid,
    direction: this.tank.direction,
    x: this.tank.x,
    y: this.tank.y
  });
  this.lastShot = d;
};
