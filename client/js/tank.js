/*

  tank.js

*/

Tank.prototype = new GameObject ();
Tank.prototype.constructor = Tank;

function Tank () {

  GameObject.call(this);
  this.direction = DIRECTION.NORTH;
  this.type = TYPE.TANK;
  this.sizeX = 20;
  this.sizeY = 20;
  this.domElement = $("<div>");
  this.domElement.addClass("testTank");

  $("#map").append(this.domElement);
}

Tank.prototype.moveTo = function (x, y) {
  this.x = x;
  this.y = y;
};
