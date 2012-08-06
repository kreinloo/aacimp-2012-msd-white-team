/*

  gameobject_spec.js

*/

describe("GameObject test suite", function () {

  var gameObject;

  it("should have coordinates", function () {
    gameObject = new GameObject();
    expect(gameObject.x).toBeDefined();
    expect(gameObject.y).toBeDefined();
  });

});
