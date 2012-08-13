/*

  common.js

  Common variables for our project.

*/

var BRICK_TYPE = {
  STONE_WALL  : 0x000101,
  FOREST      : 0x000102,
  ROCK        : 0x000103
};

var MESSAGE = {
  CONNECT       : 0x000201,
  DISCONNECT    : 0x000202,
  FULL_UPDATE   : 0x000203,
  PARTIAL_UPDATE: 0x000204,
  PLAYER_ID     : 0x000205
};

var DIRECTION = {
  NORTH         : 0x000301,
  SOUTH         : 0x000302,
  WEST          : 0x000303,
  EAST          : 0x000304
};

var EVENT = {
  MOVE          : "EVENT_MOVE",
  SHOT          : "EVENT_SHOT",
  SCORE         : "EVENT_SCORE",
  NEW_TANK      : "NEW_TANK",
  DESTROY_TANK  : "DESTROY_TANK"
};

var TYPE = {
  TANK          : 'tank',
  BULLET        : 'bullet',
  BRICK         : 'brick',

  FOREST        : 'forest',
  WALL          : 'wall',
  STONE         : 'stone'
};

var MAP = {
  SIZE_X        : 60,
  SIZE_Y        : 36
};

if (typeof exports != "undefined") {
  module.exports.TYPE = TYPE;
  module.exports.MAP = MAP;
  module.exports.DIRECTION = DIRECTION;
  module.exports.MESSAGE = MESSAGE;
  module.exports.BRICK_TYPE = BRICK_TYPE;
  module.exports.EVENT = EVENT;
}
