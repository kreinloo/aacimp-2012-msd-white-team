/*

  tank.js

*/

Tank.prototype = new GameObject ();
Tank.prototype.constructor = Tank;

function Tank () {
  GameObject.call(this);
  this.domElement = $("<div />").addClass("testTank");
  $("#map").append(this.domElement);
}

Tank.prototype = new GameObject({
  type: TYPE.TANK,
  direction: DIRECTION.NORTH,

  sizeX: 20,
  sizeY: 20,

  moveTo: function (x, y) {
    this.x = x;
    this.y = y;
  }
});
