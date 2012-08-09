/*

  brick.js

*/

function Brick () {
  GameObject.call(this);
}

Brick.prototype = new GameObject({
  type: TYPE.BRICK,
  sizeX: 3,
  sizeY: 3,
  needsRendering: true
});
