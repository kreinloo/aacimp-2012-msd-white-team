/**
 * Created with JetBrains WebStorm.
 * User: Emanuele
 * Date: 06/08/12
 * Time: 13.12
 * To change this template use File | Settings | File Templates.
 */
var distance = 5;
var velocity = 10;
var idTank;
var bullet;

function shooting(tank){
    //this function create a bullet, assign a direction to it according to his direction then set copy tank's id
    // todo rate , we should consider how many times per second the tanks can shoot
    var tank = document.getElementsByClassName('testTank')[0];
    //var tank = document.getElementById(tank);
    if ("tank"){
        var direction = tank.prototype.direction;
        switch (direction){
            case DIRECTION.NORTH :
                alert ('direction North');
                idTank = DIRECTION.NORTH;
                break;
            case DIRECTION.SOUTH:
                alert ('direction South');
                idTank = DIRECTION.SOUTH;
                break;
            case DIRECTION.EAST :
                alert ('direction East');
                idTank = DIRECTION.EAST;
                break;
            case DIRECTION.WEST:
                alert ('direction West');
                idTank = DIRECTION.WEST;
                break;
           }
        bullet = Bullet();
        bullet.tankId = idTank;
    }
}
function updateBullet(count){
    if (count != distance){
        
    }else{
        //todo call verify explosion
    }

}
function verifyExplosion(position, direction ){ //position array of cell
    //if position.next is full(tank or wall) then
    //  explode and set a variable false for example active = false;
    //position = position.next

}