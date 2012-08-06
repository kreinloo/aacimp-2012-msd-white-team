/*

  main.js

*/

$(document).ready(function () {

  var r = new Renderer();
  r.initialize();
  var t = new Tank();

  r.drawObject(t);

  setTimeout(function () {
    t.moveTo(0,1);
    r.drawObject(t);
  }, 1000);

});
