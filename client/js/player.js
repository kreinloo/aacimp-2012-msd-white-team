/*

  player.js

*/

function Player (tankId) {
  this.tank = map.objects[tankId];
}

Player.prototype = {
  name: null,
  tank: null,
  oldX: null,
  oldY: null
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
};

Player.prototype.shoot = function () {
  this.tank.shoot();
};
