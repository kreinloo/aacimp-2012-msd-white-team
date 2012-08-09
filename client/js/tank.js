/*

  tank.js

*/

function Tank () {
  GameObject.call(this);
}

Tank.prototype = new GameObject({
  type: TYPE.TANK,
  direction: DIRECTION.NORTH,

  sizeX: 3,
  sizeY: 3,

  moveTo: function (x, y) {
    this.x = x;
    this.y = y;
  },

  shoot: function () {
    var bullet = new Bullet (this);
    map.addObject(bullet);
  }
});
