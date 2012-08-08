/*

  brick.js

*/

function Brick () {
  GameObject.call(this);
  this.domElement.addClass("brick");
}

Brick.prototype = new GameObject({
  type: TYPE.BRICK
});
