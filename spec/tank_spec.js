/*

  tank_spec.js

*/

describe("Tank", function () {

  var tank;

  it("should have a direction", function () {
    tank = new Tank();
    expect(tank.direction).toBeDefined();
  });

  it("should have the right type identifier", function () {
    tank = new Tank();
    expect(tank.type).toEqual(TYPE.TANK);
  });

});
