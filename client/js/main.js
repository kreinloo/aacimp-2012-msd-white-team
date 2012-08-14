/*

  main.js

*/

var map;
var player = null;
var socket;

function partialUpdateHandler (data) {

    var obj = null;
    var tank, bullet;
    if (data.event === EVENT.MOVE) {
      //console.log("RECV: MOVE");
      if (player && data.uid === player.tank.uid) {
        return;
      }
      map.updateObjectPosition(data);
    }

    else if (data.event === EVENT.NEW_TANK) {
      //console.log("RECV: NEW_TANK");
      var objData = data.obj;
      tank = new Tank(objData);
      map.addObject(tank);
    }

    else if (data.event === EVENT.DESTROY_OBJECT) {
      //console.log("RECV: DESTROY_OBJECT");
      obj = map.objects[data.uid];
      bullet = map.objects[data.buid];
      if (obj) { obj.destroy(); }
      if (bullet) { bullet.destroy(); }
      if (obj && obj === player.tank) {
        player.endGame();
        setTimeout(function () {
          socket.emit(MESSAGE.TANK_REQUEST);
        }, 2000);
      }
    }

    else if (data.event === EVENT.SHOT) {
      //console.log("RECV: SHOT");
      tank = map.objects[data.tankId];
      if (!tank) { return; }
      bullet = new Bullet (tank);
      bullet.direction = data.direction;
      bullet.uid = data.bulletId;
      map.addObject(bullet);
    }

    else if (data.event === EVENT.HP_UPDATE) {
      //console.log("RECV: HP_UPDATE");
      obj = map.objects[data.uid];
      if (!obj) { return; }
      obj.hp = data.hp;
      if (obj.uid === player.tank.uid) {
        player.updateHealthbar();
      }
    }

};

$(function () {

  map = new Map();
  map.isServer = false;
  map.initialize();
  player = new Player();

  setInterval(function () {
    map.updateBullets();
    map.renderScene();
  }, 30);

  setInterval(function () {
    map.updateObjects();
    map.renderScene();

    if (!player.isDead && (player.oldX !== player.tank.x ||
                           player.oldY !== player.tank.y)) {
      socket.emit(MESSAGE.PARTIAL_UPDATE, {
        event: EVENT.MOVE,
        uid: player.tank.uid,
        x: player.tank.x,
        y: player.tank.y,
        direction: player.tank.direction
      });
      player.oldX = player.tank.x;
      player.oldY = player.tank.y;
    }

  }, 150);

  if (document.URL.split(":")[0] === "file") {
    socket = io.connect("http://127.0.0.1:8008");
  }
  else {
    socket = io.connect("http://ec2-46-137-36-39.eu-west-1.compute.amazonaws.com:8008");
  }

  socket.on(MESSAGE.FULL_UPDATE, function (data) {
    //console.log("RECV: FULL_UPDATE");
    objects = JSON.parse(data);
    var obj, objKey, objData;

    for (objKey in objects) {
      objData = objects[objKey];

      if (objData.type === TYPE.TANK) {
        obj = new Tank(objData);
      }

      else if (objData.type === TYPE.FOREST ||
               objData.type === TYPE.WALL ||
               objData.type === TYPE.STONE) {
        obj = new Brick(objData);
      }

      else if (objData.type === TYPE.BULLET) {
        obj = new Bullet(objData);
      }
      map.addObject(obj);
    }
  });

  socket.on(MESSAGE.PLAYER_ID, function (data) {
    //console.log("RECV: PLAYER_ID: " + data.id);
    player.startGame(data.id);
  });

  socket.on(MESSAGE.PARTIAL_UPDATE, function (data) {
    partialUpdateHandler(data);
  });

  socket.on(MESSAGE.UPDATES, function (data) {
    for (var i in data) {
      partialUpdateHandler(data[i].data);
    }
  });

  setTimeout(function () {
    socket.emit(MESSAGE.FULL_UPDATE);
  }, 2000);

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
    if (!player.isDead) {
      player.tank.needsRendering = true;
      player.tank.render();
    }
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

  var accActivationLevel = 8, prevAccEvent = 0;

  $(window).bind('acc', function (e) {
      if (!$('#accelerometer').prop('checked')) {
          return;
      }

      var time = Date.now();
      if (time - prevAccEvent < 200) {
          return;
      }
      prevAccEvent = time;

      var params =
        Math.abs(e.accX) > Math.abs(e.accY)
        ? {acc: e.accX, actions: ['moveLeft', 'moveRight']}
        : {acc: e.accY, actions: ['moveDown', 'moveUp']};

      if (player) player.stop();
      if (Math.abs(params.acc) < accActivationLevel) {
          return;
      }
      var dir = params.acc > 0 ? 1 : 0;
      var action = params.actions[dir];
      player[action]();
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

  var shootingId = false;

  $('#buttonShoot')
  .bind('mousedown touchstart', function() {
     function shooting() {
         player.shoot();
         shootingId = setTimeout(shooting, 50);
     }
     shooting();
     return false;
  })
  .bind('mouseup touchend', function() {
    clearTimeout(shootingId);
    return false;
  });

});
