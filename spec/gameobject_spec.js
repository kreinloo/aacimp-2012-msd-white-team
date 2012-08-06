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

});
