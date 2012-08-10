/*

  map_spec.js

*/

describe("Map", function () {

  var map;

  beforeEach(function () {
    map = new Map();
  })

  it("should add a new object to its matrix", function () {
    var tank = new Tank();
    tank.x = 10;
    tank.y = 20;
    map.addObject(tank);
    expect(map.map[20][10]).toEqual(tank.uid);
    expect(map.map[20+tank.sizeY-1][10+tank.sizeX-1]).toEqual(tank.uid);
  });

});
