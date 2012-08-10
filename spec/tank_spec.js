/*

  tank_spec.js

*/

describe("Tank", function () {

  var tank;

  beforeEach(function () {
    tank = new Tank();
  });

  it("should have a direction", function () {
    expect(tank.direction).toBeDefined();
  });

  it("should have the right type identifier", function () {
    expect(tank.type).toEqual(TYPE.TANK);
  });

});
