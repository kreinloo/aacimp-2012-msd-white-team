/*

  brick.js

*/

function Bullet () {
  GameObject.call(this);
  this.domElement.addClass("bullet")
}

Bullet.prototype = new GameObject({
  type: TYPE.BULLET,
  tankId: null,
  direction: DIRECTION.NORTH
});
