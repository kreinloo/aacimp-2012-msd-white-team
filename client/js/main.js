/*

  main.js

*/

var map;

$(function () {

  map = new Map();
  var tank = new Tank();

  map.addObject(tank);

  b1 = new Brick(); b1.x = 1; b1.y = 10;
  b2 = new Brick(); b2.x = 10; b2.y = 10;
  b3 = new Brick(); b3.x = 20; b3.y = 1;
  b4 = new Brick(); b4.x = 1; b4.y = 19;

  map.addObject(b1);
  map.addObject(b2);
  map.addObject(b3);
  map.addObject(b4);

  setInterval(function () {
    map.updateObjects();
    map.renderScene();
  }, 100);

  setInterval(function () {
    map.updateBullets();
    map.renderScene();
  }, 30);

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
