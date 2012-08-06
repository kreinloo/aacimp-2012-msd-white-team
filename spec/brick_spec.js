/*

  brick_spec.js

*/

describe("Brick test suite", function () {

  var brick;

  it("should have a type", function () {
    brick = new Brick();
    expect(brick.type).toBeDefined();
  });

});
