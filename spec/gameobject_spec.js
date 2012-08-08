/*

  gameobject_spec.js

*/

describe("GameObject", function () {

  var gameObject;

  it("should have a type", function () {
    gameObject = new GameObject();
    expect(gameObject.type).toBeDefined();
  });

  it("should have coordinates", function () {
    gameObject = new GameObject();
    expect(gameObject.x).toBeDefined();
    expect(gameObject.y).toBeDefined();
  });

  it("should have velocity and other variables", function () {
    gameObject = new GameObject();
    expect(gameObject.xVel).toBeDefined();
    expect(gameObject.yVel).toBeDefined();
    expect(gameObject.isMoving).toBeDefined();
    expect(gameObject.needsRendering).toBeDefined();
    expect(gameObject.domElement).toBeDefined();
    expect(gameObject.uid).toBeDefined();
  });

  it("should generate an uid while being created", function () {
    gameObject = new GameObject();
    expect(gameObject.uid).not.toEqual(null);
  });

});
