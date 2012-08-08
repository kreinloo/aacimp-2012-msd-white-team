/*

  main.js

*/

$(function () {

  var map = new Map();
  var tank = new Tank();

  map.addObject(tank);

  setInterval(function () {
    map.updateObjects();
    map.renderScene();
  }, 50);

  $(document).keydown(function (e) {

    switch (e.keyCode) {
      case 38:
        tank.yVel = -1;
        break;
      case 40:
        tank.yVel = +1;
        break;
      case 37:
        tank.xVel = -1;
        break;
      case 39:
        tank.xVel = +1;
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
