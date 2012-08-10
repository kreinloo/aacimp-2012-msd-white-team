/*

  gameobject_spec.js

*/

describe("GameObject", function () {

  var gameObject;

  beforeEach(function () {
    gameObject = new GameObject();
  });

  it("should have a type", function () {
    expect(gameObject.type).toBeDefined();
  });

  it("should have coordinates", function () {
    expect(gameObject.x).toBeDefined();
    expect(gameObject.y).toBeDefined();
  });

  it("should have velocity and other variables", function () {
    expect(gameObject.xVel).toBeDefined();
    expect(gameObject.yVel).toBeDefined();
    expect(gameObject.isMoving).toBeDefined();
    expect(gameObject.needsRendering).toBeDefined();
    expect(gameObject.domElement).toBeDefined();
    expect(gameObject.uid).toBeDefined();
  });

  it("should generate an uid while being created", function () {
    expect(gameObject.uid).not.toEqual(null);
  });

  it("should be destructible by default", function () {
    map = new Map();
    spyOn(map, "removeObject");
    map.addObject(gameObject);
    gameObject.registerHit();
    gameObject.registerHit();
    gameObject.registerHit();
    expect(map.removeObject).toHaveBeenCalled();
  });

});
