/*

  gameobject.js

*/

if (typeof exports != "undefined") {
  var COMMON = require("./common.js");
  var TYPE = COMMON.TYPE;
  var DIRECTION = COMMON.DIRECTION;
  var $ = require("jquery");
}

function GameObject (options) {
  if (!options.uid) this.uid = GameObject.AUTO_INCREMENT++;
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
  needsRendering: true,

  sizeX: 0,
  sizeY: 0,

  isDestructible: true,
  isPenetrable: false,
  hp: 3,

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

    var i, j;
    for (j = 0; j < this.sizeY; j++) {
      for (i = 0; i < this.sizeX; i++) {
        var ty = this.y + j;
        var tx = this.x + i;
        if (ty < 0 || tx < 0 || ty >= 36 || tx >= 60) {
          console.log("this should be destroyed by now");
          console.log(this.type);
          console.log("x: " + this.x + " y: " + this.y);
        }
        if (map.map[this.y + j][this.x + i] !== undefined &&
            map.map[this.y + j][this.x + i] !== 0 &&
            map.map[this.y + j][this.x + i] !== this.uid &&
            !map.objects[map.map[this.y + j][this.x + i]].isPenetrable) {
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

    if (this.type === TYPE.TANK) {
        switch (this.direction) {
            case DIRECTION.NORTH :
                this.domElement.css("transform","rotate(0deg)");
                break;
            case DIRECTION.SOUTH :
                this.domElement.css("transform","rotate(180deg)");
                break;
            case DIRECTION.WEST :
                this.domElement.css("transform","rotate(270deg)");
                break;
            case DIRECTION.EAST :
                this.domElement.css("transform","rotate(90deg)");
                break;
        }
    }

    this.needsRendering = false;
  },

  destroy: function () {
    map.removeObject(this);
    this.domElement.remove();
  },

  registerHit: function () {
    if (this.isDestructible) {
      this.hp--;
      if (this.hp <= 0) {
        this.destroy();
        return true;
      }
      return false;
    }
  }

};

GameObject.AUTO_INCREMENT = 0;

if (typeof exports != "undefined") {
  module.exports.GameObject = GameObject;
}
