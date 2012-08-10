/*

  bullet_spec.js

*/

describe("Bullet", function () {

  var bullet;

  it("should have a direction", function () {
    bullet = new Bullet(new Tank());
    expect(bullet.direction).toBeDefined();
  });

  it("should have a tank id", function () {
    bullet = new Bullet(new Tank());
    expect(bullet.tankId).toBeDefined();
  });

  it("should have the right type identifier", function () {
    bullet = new Bullet(new Tank());
    expect(bullet.type).toEqual(TYPE.BULLET);
  });

  it("should be created with right direction", function () {
    var tank = new Tank();
    tank.direction = DIRECTION.NORTH;
    bullet = new Bullet(tank);
    expect(bullet.direction).toEqual(DIRECTION.NORTH);

    tank.direction = DIRECTION.SOUTH;
    bullet = new Bullet(tank);
    expect(bullet.direction).toEqual(DIRECTION.SOUTH);

    tank.direction = DIRECTION.WEST;
    bullet = new Bullet(tank);
    expect(bullet.direction).toEqual(DIRECTION.WEST);

    tank.direction = DIRECTION.EAST;
    bullet = new Bullet(tank);
    expect(bullet.direction).toEqual(DIRECTION.EAST);

  });

});
