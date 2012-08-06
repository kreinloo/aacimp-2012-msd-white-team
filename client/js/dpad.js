var height = screen.height;
var width = screen.width;

arrowUp = document.getElementById("arrowUp");
arrowDown = document.getElementById("arrowDown");
arrowRight = document.getElementById("arrowRight");
arrowLeft = document.getElementById("arrowLeft");
buttonShoot = document.getElementById("buttonShoot");


function touchUp(){
    alert("UP");
}
function touchDown(){
    alert("DOWN");
}
function touchRight(){
    alert("RIGHT");
}
function touchLeft(){
    alert("LEFT");
}
function touchShoot(){
    alert("BOOOM!");
}
arrowUp.addEventListener("touchstart", touchUp, false);
arrowDown.addEventListener("touchstart", touchDown, false);
arrowRight.addEventListener("touchstart", touchRight, false);
arrowLeft.addEventListener("touchstart", touchLeft, false);
buttonShoot.addEventListener("touchstart", touchShoot, false);