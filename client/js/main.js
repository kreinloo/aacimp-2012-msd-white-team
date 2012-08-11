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

  var i, j, random, brick;
  for (i = 0; i < 33; i += 3 ) {
    for (j = 0; j < 57; j += 3) {
      random = Math.floor(Math.random()*8);
      switch (random) {
        case 0:
          brick = new Brick({
            x: j,
            y: i,
            type: TYPE.FOREST,
            isPenetrable: true,
            isDestructible: false
          });
          map.addObject(brick);
          break;
        case 1:
          brick = new Brick({
            x: j,
            y: i,
            type: TYPE.WALL,
            sizeX: Math.floor(Math.random() * 2) + 1,
            sizeY: Math.floor(Math.random() * 2) + 1,
            isDestructible: false
          });
          map.addObject(brick);
          break;
        case 2:
          brick = new Brick({
            x: j,
            y: i,
            type: TYPE.STONE,
            sizeX: 1,
            sizeY: 1
          });
          map.addObject(brick);
          break;
        default:
          //nothing to add
          break;
      }
    }
  }

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

      default:
        return;
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

  var accActivationLevel = 15;

  $(window).bind('acc', function (e) {
      if (!$('#accelerometer').prop('checked')) return;

      var params =
        Math.abs(e.accX) > Math.abs(e.accY)
        ? {acc: e.accX, actions: ['moveLeft', 'moveRight']}
        : {acc: e.accY, actions: ['moveDown', 'moveUp']};

      if (Math.abs(e.accX) > accActivationLevel) {
        var dir = params.acc > 0 ? 0 : 1;
        var action = params.actions[dir];
        player.stop();
        player[action]();
      } else {
        player.stop();
      }
  });

  $('.arrow')
  .bind('mousedown touchstart', function() {
    var action = $(this).data('action');
    player[action]();
    return false;
  })
  .bind('mouseup touchend', function() {
    player.stop();
    return false;
  });

  $('#buttonShoot').click(function() { player.shoot(); return false; });
});
