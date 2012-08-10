/*

  bullet.js

*/

function Bullet (tank) {

  var x = tank.x,
      y = tank.y,
      xVel = 0,
      yVel = 0;

  switch (tank.direction) {
    case DIRECTION.NORTH:
      x += 1;
      yVel = -1;
      break;

    case DIRECTION.SOUTH:
      y += 2;
      x += 1;
      yVel = +1;
      break;

    case DIRECTION.EAST:
      y += 1;
      x += 2;
      xVel = +1;
      break;

    case DIRECTION.WEST:
      y += 1;
      xVel = -1;
      break;
  }

  GameObject.call(this, {
    tankId: tank.uid,
    direction: tank.direction,
    x: x,
    y: y,
    xVel: xVel,
    yVel: yVel
  });

}

Bullet.prototype = new GameObject({
  type: TYPE.BULLET,
  tankId: null,
  direction: DIRECTION.NORTH,
  sizeX: 1,
  sizeY: 1
});
