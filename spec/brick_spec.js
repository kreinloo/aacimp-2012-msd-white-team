/*

  brick_spec.js

*/

describe("Brick", function () {

  var brick;

  beforeEach(function () {
    brick = new Brick();
  });

  it("should have the right type identifier", function () {
    expect(brick.type).toEqual(TYPE.WALL);
  });

});
