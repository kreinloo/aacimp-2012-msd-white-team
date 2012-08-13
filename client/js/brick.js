/*

  brick.js

*/

if (typeof exports != "undefined") {
  var GameObject = require("./gameobject.js").GameObject;
  var COMMON = require("./common.js");
  var TYPE = COMMON.TYPE;
  var DIRECTION = COMMON.DIRECTION;
  var BRICK_TYPE = COMMON.BRICK_TYPE;
}

function Brick (args) {
  GameObject.call(this, args);
}

Brick.prototype = new GameObject({
  type: TYPE.WALL,
  sizeX: 3,
  sizeY: 3
});

if (typeof exports != "undefined") {
  module.exports = Brick;
}
