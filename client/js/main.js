/*

  main.js

*/

var map;

$(function () {

  map = new Map();
  var tank = new Tank();

  map.addObject(tank);

  setInterval(function () {
    map.updateObjects();
    map.renderScene();
  }, 100);

  $(document).keydown(function (e) {

    switch (e.keyCode) {
      case 38:
        tank.yVel = -1;
        tank.direction = DIRECTION.NORTH;
        break;
      case 40:
        tank.yVel = +1;
        tank.direction = DIRECTION.SOUTH;
        break;
      case 37:
        tank.xVel = -1;
        tank.direction = DIRECTION.WEST;
        break;
      case 39:
        tank.xVel = +1;
        tank.direction = DIRECTION.EAST;
        break;

      case 32:
        console.log("shoot")
        tank.shoot();
        break;
    }

    return false;

  });

  $(document).keyup(function (e) {

    switch (e.keyCode) {
      case 38:
        tank.yVel = 0;
        break;
      case 40:
        tank.yVel = 0;
        break;
      case 37:
        tank.xVel = 0;
        break;
      case 39:
        tank.xVel = 0;
        break;
    }

    return false;

  });

});
