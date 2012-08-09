function Map () {
  this.objects = {};
  this.domElement = $("#map");
  this.map = [];
  this.initialize();
}

Map.prototype = {
  initialize: function () {
    for (var i = 0; i < 36; i++) {
      this.map[i] = [];
      for (var j = 0; j < 60; j++) {
        this.map[i][j] = 0;
      }
    }
  },

  updateObjects: function () {
    for (var objKey in this.objects) {
      this.objects[objKey].update();
    }
  },

  renderScene: function () {
    for (var obj in this.objects) {
      this.objects[obj].render();
    }
  },

  addObject: function (obj) {
    this.objects[obj.uid] = obj;
    this.domElement.append(obj.domElement);
    for (var i = 0; i < obj.sizeY; i++) {
      for (var j = 0; j < obj.sizeX; j++) {
        this.map[obj.y + i][obj.x + j] = obj.uid;
      }
    }
  },

  removeObject: function (obj) {
    delete this.objects[obj.uid];
  },

  // debugging
  printMap: function () {
    for (var i = 0; i < 36; i++) {
      console.log(this.map[i]);
    }
  }
}
