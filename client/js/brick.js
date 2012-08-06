/*

  brick.js

*/

Brick.prototype = new GameObject();
Brick.prototype.constructor = Brick;

function Brick () {
  GameObject.call(this);
  this.type = TYPE.BRICK;
}
