/*

  brick.js

*/

function Bullet () {
  GameObject.call(this);
}

Bullet.prototype = new GameObject({
  type: TYPE.BULLET,
  tankId: null,
  direction: DIRECTION.NORTH
});
