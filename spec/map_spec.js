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

  it("should not add an object to map if something is already at that position",
    function() {
    var tank1 = new Tank();
    var tank2 = new Tank();
    map.addObject(tank1);
    expect(Object.keys(map.objects).length).toEqual(1);
    map.addObject(tank1);
    expect(Object.keys(map.objects).length).toEqual(1);
  });

});
