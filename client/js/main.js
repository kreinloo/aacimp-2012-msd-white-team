/*

  main.js

*/

var map;
var player;

$(function () {

  map = new Map();
  player = new Player();

  map.addObject(player.tank);
  map.addObject(new Tank({ x: 40, y: 10 }));

  var b1 = new Brick(); b1.x = 1; b1.y = 10;
  var b2 = new Brick(); b2.x = 10; b2.y = 10;
  var b3 = new Brick(); b3.x = 20; b3.y = 1;
  var b4 = new Brick(); b4.x = 1; b4.y = 19;

  map.addObject(new Brick({x: 20, y: 25, sizeX: 1, sizeY: 1}));

  b5 = new Brick({
    sizeX: 60,
    sizeY: 1,
    brickType: BRICK_TYPE.STONE_WALL,
    isDestructible: false
  });
  b6 = new Brick({
    sizeX: 60,
    sizeY: 1,
    y: 35,
    brickType: BRICK_TYPE.STONE_WALL,
    isDestructible: false
  });
  b7 = new Brick({
    sizeX: 1,
    sizeY: 34,
    y: 1,
    brickType: BRICK_TYPE.STONE_WALL,
    isDestructible: false
  });
  b8 = new Brick({
    sizeX: 1,
    sizeY: 34,
    y: 1,
    x: 59,
    brickType: BRICK_TYPE.STONE_WALL,
    isDestructible: false
  });
  map.addObject(b5);
  map.addObject(b6);
  map.addObject(b7);
  map.addObject(b8);

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
        player.moveUp();
        break;

      case 40:
        player.moveDown();
        break;

      case 37:
        player.moveLeft();
        break;

      case 39:
        player.moveRight();
        break;

      case 32:
        player.shoot();
        break;
    }

    // if tank does not move but changes direction, it should be repainted
    player.tank.needsRendering = true;
    player.tank.render();
    return false;

  });

  $(document).keyup(function (e) {

    switch (e.keyCode) {
      case 38:
      case 40:
      case 37:
      case 39:
        player.stop();
        return false;
    }

  });

});
