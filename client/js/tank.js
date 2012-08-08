/*

  tank.js

*/

Tank.prototype = new GameObject ();
Tank.prototype.constructor = Tank;

function Tank () {
  GameObject.call(this);
  this.domElement.addClass("tank");
}

Tank.prototype = new GameObject({
  type: TYPE.TANK,
  direction: DIRECTION.NORTH,

  sizeX: 30,
  sizeY: 30,

  moveTo: function (x, y) {
    this.x = x;
    this.y = y;
  }
});
