/*

  bullet_spec.js

*/

describe("Bullet", function () {

  var bullet;

  beforeEach(function () {
    bullet = new Bullet(new Tank());
  });

  it("should have a direction", function () {
    expect(bullet.direction).toBeDefined();
  });

  it("should have a tank id", function () {
    expect(bullet.tankId).toBeDefined();
  });

  it("should have the right type identifier", function () {
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
