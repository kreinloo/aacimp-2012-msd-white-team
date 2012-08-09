/*

  brick_spec.js

*/

describe("Brick", function () {

  var brick;

  it("should have the right type identifier", function () {
    brick = new Brick();
    expect(brick.type).toEqual(TYPE.BRICK);
  });

});
