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
}

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
    if (this.xVel === 0 && this.yVel === 0) { return null; }

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
    if (x1 < 0 || x2 >= 60) { this.destroy(); return; }
    if (y1 < 0 || y2 >= 36) { this.destroy(); return; }

    var i, j;
    for (j = 0; j < this.sizeY; j++) {
      for (i = 0; i < this.sizeX; i++) {
        if (map.map[this.y + j][this.x + i] !== 0 &&
            map.map[this.y + j][this.x + i] !== this.uid) {
          var objId = map.map[this.y + j][this.x + i];
          this.x -= this.xVel;
          this.y -= this.yVel;
          return [this.uid, objId];
        }
      }
    }

    for (j = 0; j < this.sizeY; j++) {
      for (i = 0; i < this.sizeX; i++) {
        map.map[this.y - this.yVel + j][this.x - this.xVel + i] = 0;
      }
    }

    for (j = 0; j < this.sizeY; j++) {
      for (i = 0; i < this.sizeX; i++) {
        map.map[this.y + j][this.x + i] = this.uid;
      }
    }

    //console.log("x1: " + this.x + " x2: " + (this.x + 3) +
    //  " y1: " + this.y + " y2: " + (this.y + 3));

    this.needsRendering = true;
    return null;
  },

  render: function () {
    if (!this.needsRendering) return;

    this.domElement.css({
      left: this.x * 10,
      top: this.y * 10
    });

    if(this.type === TYPE.TANK){
        switch(this.direction){
            case DIRECTION.NORTH :
                this.domElement.css("-webkit-transform","rotate(0deg)");
                break;
            case DIRECTION.SOUTH :
                this.domElement.css("-webkit-transform","rotate(180deg)");
                break;
            case DIRECTION.WEST :
                this.domElement.css("-webkit-transform","rotate(270deg)");
                break;
            case DIRECTION.EAST :
                this.domElement.css("-webkit-transform","rotate(90deg)");
                break;
        }
    }

    this.needsRendering = false;
  },

  destroy: function () {
    map.removeObject(this);
    this.domElement.remove();
  }
};

GameObject.AUTO_INCREMENT = 0;
