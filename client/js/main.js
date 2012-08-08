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
        return false;
        
      case 40:
        tank.yVel = +1;
        tank.direction = DIRECTION.SOUTH;
        return false;
        
      case 37:
        tank.xVel = -1;
        tank.direction = DIRECTION.WEST;
        return false;
        
      case 39:
        tank.xVel = +1;
        tank.direction = DIRECTION.EAST;
        return false;

      case 32:
        console.log("shoot")
        tank.shoot();
        return false;
    }

  });

  $(document).keyup(function (e) {

    switch (e.keyCode) {
      case 38:
      case 40:
        tank.yVel = 0;
        return false;
        
      case 37:
      case 39:
        tank.xVel = 0;
        return false;
    }

  });

});
