/*

  tank_spec.js

*/

describe("Tank test suite", function () {

  var tank;

  it("should have a direction", function () {
    tank = new Tank();
    expect(tank.direction).toBeDefined();
  });

});
