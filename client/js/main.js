/*

  main.js

*/

var map;
var player;
var brick;

$(function () {

  map = new Map();
  player = new Player();

  map.addObject(player.tank);
  map.addObject(new Tank({ x: 40, y: 10 }));

    for (var i=0; i<33;i += 3 ){
        for (var j=0;j<57;j += 3){
            var random=Math.floor(Math.random()*8);
            switch(random)
            {
                case 0:
                    brick = new Brick();
                    brick.x = j;
                    brick.y = i;
                    brick.brickType = BRICK_TYPE.FOREST;
                    map.addObject(brick);
                    break;
                case 1:
                    brick = new Brick();
                    brick.x = j;
                    brick.y = i;
                    brick.brickType = BRICK_TYPE.ROCK;
                    map.addObject(brick);
                    break;
                case 2:
                    brick = new Brick();
                    brick.x = j;
                    brick.y = i;
                    brick.brickType = BRICK_TYPE.STONE_WALL;
                    brick.isDestructible= false;
                    map.addObject(brick);
                    break;
                case 3:
                    brick = new Brick({sizeX:1,sizeY:3});
                    brick.x = j;
                    brick.y = i;
                    brick.brickType = BRICK_TYPE.ROCK;
                    map.addObject(brick);
                    break;
                default:
                    //nothing to add
                    break;
            }
        }
    }

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

  var accActivationLevel = 15;

  $(window).bind('acc', function (e) {
      var params =
        Math.abs(e.accX) > Math.abs(e.accY)
        ? {acc: e.accX, velProp: 'xVel', directions: [DIRECTION.EAST,  DIRECTION.WEST]}
        : {acc: e.accY, velProp: 'yVel', directions: [DIRECTION.SOUTH, DIRECTION.NORTH]};

      if (Math.abs(params.acc) > accActivationLevel) {
        var dir = params.acc > 0 ? 1 : 0;
        tank[params.velProp] = dir;
        tank.direction = params.directions[dir];
      } else {
        tank.xVel = tank.yVel = 0;
      }
  });

});
