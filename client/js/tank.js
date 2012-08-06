/*

  tank.js

*/

Tank.prototype = new GameObject ();
Tank.prototype.constructor = Tank;

function Tank () {
  GameObject.call(this);
  this.direction = DIRECTION.NORTH;
}

Tank.prototype.toString = function () {
  console.log("TANK AT X: " + this.x + " Y: " + this.y);
};
