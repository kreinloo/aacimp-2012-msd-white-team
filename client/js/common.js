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
  PARTIAL_UPDATE: 0x000204
};

var DIRECTION = {
  NORTH         : 0x000301,
  SOUTH         : 0x000302,
  WEST          : 0x000303,
  EAST          : 0x000304
};

var EVENT = {
  MOVE          : 0x000401,
  SHOT          : 0x000402,
  SCORE         : 0x000403
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
