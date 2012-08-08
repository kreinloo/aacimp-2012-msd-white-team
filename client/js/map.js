function Map () {

  var objects = {};
  var domMap = $("#map");
  var map = [];

  this.initialize = function () {
    var i, j;
    for (i = 0; i < 120; i++) {
      for (j = 0; j < 200; j++) {

      }
    }
  }

  this.updateObjects = function () {
    for (var obj in objects) {
      objects[obj].update();
    }
  }

  this.renderScene = function () {
    for (var obj in objects) {
      objects[obj].render();
    }
  }

  this.addObject = function (obj) {
    objects[obj.uid] = obj;
  }

  this.removeObject = function (obj) {
    delete objects[obj.uid];
  }

}
