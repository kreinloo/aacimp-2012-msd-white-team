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

});
