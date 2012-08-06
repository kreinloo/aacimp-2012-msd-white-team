/*

  bullet_spec.js

*/

describe("Bullet test suite", function () {

  var bullet;

  it("should have a direction", function () {
    bullet = new Bullet();
    expect(bullet.direction).toBeDefined();
  });

  it("should have a tank id", function () {
    bullet = new Bullet();
    expect(bullet.tankId).toBeDefined();
  });

});
