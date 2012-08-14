if (typeof exports != "undefined") {
  var $ = require("jquery");
  var COMMON = require("./common.js");
  var MAP = COMMON.MAP;
  var TYPE = COMMON.TYPE;
  var DIRECTION = COMMON.DIRECTION;
  var EVENT = COMMON.EVENT;
  var MESSAGE = COMMON.MESSAGE;
}

function Map () {
  this.objects = {};
  this.domElement = $("#map");
  this.map = [];
  this.initialize();
  this.isServer = true;
  this.server = null;
}

Map.prototype = {
  initialize: function () {
    for (var i = 0; i < MAP.SIZE_Y; i++) {
      this.map[i] = [];
      for (var j = 0; j < MAP.SIZE_X; j++) {
        this.map[i][j] = 0;
      }
    }
  },

  updateObjects: function () {
    var collision;
    for (var objKey in this.objects) {
      if (this.objects[objKey].type === TYPE.BULLET) { continue; }
      collision = this.objects[objKey].update();
      if (collision) {}
    }
  },

  updateBullets: function () {
    var collision;
    for (var objKey in this.objects) {
      if (this.objects[objKey].type !== TYPE.BULLET) { continue; }
      collision = this.objects[objKey].update();

      if (collision) {
        if (this.isServer) {
          this.handleBulletCollision(collision);
        }
        var bullet = this.objects[collision[0]];
        bullet.destroy();
      }
    }
  },

  renderScene: function () {
    for (var obj in this.objects) {
      this.objects[obj].render();
    }
  },

  addObject: function (obj) {
    var i, j;
    if (obj.type !== TYPE.BULLET) {
      for (i = 0; i < obj.sizeY; i++) {
        for (j = 0; j < obj.sizeX; j++) {
          if (this.map[obj.y + i][obj.x + j] !== 0) {
            return null;
          }
        }
      }
    }
    this.objects[obj.uid] = obj;
    this.domElement.append(obj.domElement);
    for (i = 0; i < obj.sizeY; i++) {
      for (j = 0; j < obj.sizeX; j++) {
        this.map[obj.y + i][obj.x + j] = obj.uid;
      }
    }
    return obj.uid;
  },

  removeObject: function (obj) {
    try {
      delete this.objects[obj.uid];
      var i, j;
      for (j = 0; j < obj.sizeY; j++) {
        for (i = 0; i < obj.sizeX; i++) {
          this.map[obj.y + j][obj.x + i] = 0;
        }
      }
    }
    catch (e) {
      console.error("ERROR: No object found in hash table. May be it is " +
        "removed.");
    }
  },

  handleBulletCollision: function (objIDs) {
    var bullet = this.objects[objIDs[0]];
    var object = this.objects[objIDs[1]];
    if (object.uid === bullet.tankId) { return; }
    var isDead = object.registerHit();
    if (isDead) {
      server.emitUpdate(MESSAGE.PARTIAL_UPDATE, {
        event: EVENT.DESTROY_OBJECT,
        uid: object.uid,
        buid: bullet.uid
      });
    }
    else {
      if (object.isDestructible) {
        server.emitUpdate(MESSAGE.PARTIAL_UPDATE, {
          event: EVENT.HP_UPDATE,
          uid: object.uid,
          hp: object.hp
        });
      }
    }
  },

  updateObjectPosition: function (data) {
    var obj = this.objects[data.uid];
    if (!obj) { return; }
    var i, j;
    for (j = 0; j < obj.sizeY; j++) {
      for (i = 0; i < obj.sizeX; i++) {
        this.map[obj.y + j][obj.x + i] = 0;
      }
    }
    obj.x = data.x;
    obj.y = data.y;
    for (j = 0; j < obj.sizeY; j++) {
      for (i = 0; i < obj.sizeX; i++) {
        this.map[obj.y + j][obj.x + i] = obj.uid;
      }
    }
    obj.direction = data.direction;
    obj.needsRendering = true;
  }

};

if (typeof exports != "undefined") {
  module.exports = Map;
}
