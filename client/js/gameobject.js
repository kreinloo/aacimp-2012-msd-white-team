/*

  gameobject.js

*/

function GameObject () {

  this.uid = null;

  this.x = 0;
  this.y = 0;
  this.type = null;

  this.domElement = null;
  this.xVel = 0;
  this.yVel = 0;
  this.isMoving = false;
  this.needsRendering = false;

  this.sizeX = 0;
  this.sizeY = 0;

  this.generateUid();
}

GameObject.prototype.update = function () {
  if (this.xVel != 0 || this.yVel != 0) {
    this.x += this.xVel;
    this.y += this.yVel;
    this.needsRendering = true;
  }
};

GameObject.prototype.render = function () {
  if (this.needsRendering) {
    this.domElement.css("top", this.y * 2);
    this.domElement.css("left", this.x * 2);
    this.needsRendering = false;
  }
};

GameObject.prototype.generateUid = function () {
  var res, i, j;
  res = "";
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20) {
      res += "-";
    }
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    res += i;
  }
  this.uid = res;
};
