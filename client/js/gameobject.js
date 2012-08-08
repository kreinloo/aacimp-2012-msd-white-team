/*

  gameobject.js

*/

function GameObject (options) {
  this.uid = GameObject.AUTO_INCREMENT++;
  $.extend(this, options);

  this.domElement = $("<div />").addClass('gameobject').addClass(this.type).css({
    left: this.x * 10,
    top: this.y * 10,
    width: this.sizeX * 10,
    height: this.sizeY * 10
  });
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

      var x1, x2, y1, y2;
      x1 = this.x;

      if (this.sizeX > 1)
        x2 = this.x + this.sizeX;
      else
        x2 = x1;
      y1 = this.y;

      if (this.sizeY > 1)
        y2 = this.y + this.sizeY;
      else
        y2 = y1;
      // just for testing
      if (x1 < 0 || x2 > 60) { this.destroy(); }
      if (y1 < 0 || y2 > 36) { this.destroy(); }
      //console.log("x1: " + this.x + " x2: " + (this.x + 3) +
      //  " y1: " + this.y + " y2: " + (this.y + 3));

      this.needsRendering = true;
    }
  },

  render: function () {
    if (!this.needsRendering) return;

    this.domElement.css({
      left: this.x * 10,
      top: this.y * 10
    });

    this.needsRendering = false;
  },

  destroy: function () {
    map.removeObject(this);
    this.domElement.remove();
  }
};

GameObject.AUTO_INCREMENT = 0;
