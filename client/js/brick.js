/*

  brick.js

*/

function Brick () {
  GameObject.call(this);
}

Brick.prototype = new GameObject({
  type: TYPE.BRICK
});
