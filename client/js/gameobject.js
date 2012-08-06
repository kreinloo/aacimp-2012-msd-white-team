/*

  gameobject.js

*/

function GameObject () {
  this.x = 0;
  this.y = 0;
}

GameObject.prototype.toString = function () {
  console.log("X: " + this.x + ", Y: " + this.y);
};
