/*

  bullet.js

*/

Bullet.prototype = new GameObject();
Bullet.prototype.constructor = Bullet;

function Bullet () {
  GameObject.call(this);
  this.direction = DIRECTION.NORTH;
  this.tankId = null;
}
