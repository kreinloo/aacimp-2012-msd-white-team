function Map () {
  this.objects = {};
  this.domElement = $("#map");
  this.map = [];
}

Map.prototype = {
  initialize: function () {
    for (var i = 0; i < 120; i++) {
      for (var j = 0; j < 200; j++) {
        // TODO: add initializing
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
  },

  removeObject: function (obj) {
    delete this.objects[obj.uid];
  }
}