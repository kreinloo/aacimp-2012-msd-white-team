/*

  main.js

*/

var map;
var player = null;
var socket;

$(function () {

  map = new Map();
  map.isServer = false;
  map.initialize();

  setInterval(function () {
    map.updateBullets();
    map.renderScene();
  }, 30);

  setInterval(function () {
    map.updateObjects();
    map.renderScene();

    if (player && (player.oldX !== player.tank.x || player.oldY !== player.tank.y)) {
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

  }, 100);

  socket = io.connect("http://127.0.0.1:8000");

  socket.on(MESSAGE.FULL_UPDATE, function (data) {

    console.log("RECV: FULL_UPDATE");

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

      var res;
      res = map.addObject(obj);
      console.log("added obj: " + res);
    }
  });

  socket.on(MESSAGE.PLAYER_ID, function (data) {
    console.log("RECV: PLAYER_ID: " + data.id);
    player = new Player(data.id);
  });

  socket.on(MESSAGE.PARTIAL_UPDATE, function (data) {

    console.log("RECV: PARTIAL_UPDATE");

    var obj = null;
    if (data.event === EVENT.MOVE) {
      obj = map.objects[data.uid];
      if (obj) {
        obj.x = data.x;
        obj.y = data.y;
        obj.direction = data.direction;
        obj.needsRendering = true;
      }
    }

    else if (data.event === EVENT.NEW_TANK) {
      var objData = data.obj;
      var tank = new Tank(objData);
      map.addObject(tank);
    }

    else if (data.event === EVENT.DESTROY_TANK) {
      var tank = map.objects[data.uid];
      tank.destroy();
    }

    else if (data.event === EVENT.SHOT) {
      var tank = map.objects[data.tankId];
      if (!tank) { console.log("THIS SHOULD NEVER HAPPEN!"); return; }
      var bullet = new Bullet (tank);
      bullet.direction = data.direction;
      bullet.uid = data.uid;
      console.log(map.addObject(bullet));
    }

  });

  setTimeout(function () {
    socket.emit(MESSAGE.FULL_UPDATE);
  }, 500);

  $(document).keydown(function (e) {

    switch (e.keyCode) {
      case 38:
        if (player) player.moveUp();
        break;

      case 40:
        if (player) player.moveDown();
        break;

      case 37:
        if (player) player.moveLeft();
        break;

      case 39:
        if (player) player.moveRight();
        break;

      case 32:
        if (player) player.shoot();
        break;

      default:
        return;
    }

    // if tank does not move but changes direction, it should be repainted
    if (player) {
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
        if (player) player.stop();
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
