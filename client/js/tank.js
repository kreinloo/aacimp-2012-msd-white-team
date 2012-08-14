/*

  tank.js

*/

if (typeof exports != "undefined") {
  var GameObject = require("./gameobject.js").GameObject;
  var COMMON = require("./common.js");
  var TYPE = COMMON.TYPE;
  var DIRECTION = COMMON.DIRECTION;
}

function Tank (args) {
  GameObject.call(this, args);
}

Tank.prototype = new GameObject({
  type: TYPE.TANK,
  direction: DIRECTION.NORTH,

  sizeX: 3,
  sizeY: 3,

  isDestructible: true,

  shoot: function () {
    var bullet = new Bullet(this);
    map.addObject(bullet);
  }
});

if (typeof exports != "undefined") {
  module.exports = Tank;
}
