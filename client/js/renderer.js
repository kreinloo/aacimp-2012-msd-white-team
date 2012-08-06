/*

  renderer.js

*/

function Renderer () {

  var map = $("#map");
  var objects = {};

  this.initialize = function () {
    var i, j, row, cell;
    for (i = 0; i < 12; i++) {
      row = $("<tr>");
      for (j = 0; j < 20; j++) {
        cell = $("<td>");
        $(cell).attr("id", i + "-" + j);
        row.append(cell);
      }
      map.append(row);
    }
  };

  this.drawObject = function (object) {

    if (objects[object] === undefined) {

      var coordStr = "#" + object.x + "-" + object.y;
      var cell = $(coordStr);

      if (object.type === TYPE.TANK) {
        cell.append( $("<div>").addClass("testTank") );
      }
      else if (object.type === TYPE.BULLET) {
        // TODO!
      }
      else if (object.type === TYPE.BRICK) {
        // TODO!
      }

      objects[object] = coordStr;

    }

    else {

      var coordStr = objects[object];
      $(coordStr).empty();
      delete objects[object];
      this.drawObject(object);

    }

  };

}
