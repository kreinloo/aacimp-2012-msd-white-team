/*

  brick.js

*/

function Brick (args) {
  GameObject.call(this, args);
}

Brick.prototype = new GameObject({
  type: TYPE.BRICK,
  sizeX: 3,
  sizeY: 3
});
