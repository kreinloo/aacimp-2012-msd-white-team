/*

  tank.js

*/

Tank.prototype = new GameObject ();
Tank.prototype.constructor = Tank;

function Tank () {
  GameObject.call(this);
  this.direction = DIRECTION.NORTH;
  this.type = TYPE.TANK;
}

Tank.prototype.moveTo = function (x, y) {
  this.x = x;
  this.y = y;
};
