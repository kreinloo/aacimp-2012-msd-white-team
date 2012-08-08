/*

  gameobject.js

*/

function GameObject (options) {
  this.uid = GameObject.AUTO_INCREMENT++;
  $.extend(this, options);
};

GameObject.prototype = {
  uid: null,

  x: 0,
  y: 0,
  type: null,

  domElement: null,
  xVel: 0,
  yVel: 0,
  isMoving: false,
  needsRendering: false,

  sizeX: 0,
  sizeY: 0,

  update: function () {
    if (this.xVel != 0 || this.yVel != 0) {
      this.x += this.xVel;
      this.y += this.yVel;
      this.needsRendering = true;
    }
  },

  render: function () {
    if (this.needsRendering) {
      this.domElement.css({
        left: this.x * 2,
        top: this.y * 2
      });
      
      this.needsRendering = false;
    }
  }
};

GameObject.AUTO_INCREMENT = 0;