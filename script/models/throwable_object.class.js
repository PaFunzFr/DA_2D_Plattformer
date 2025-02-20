class ThrowableObject extends MovableObject {

    speedY = 0;
    speedX = 5;
    acceleration = 0.5;
    elementOnGround = 370;

    constructor() {
        super();
        this.x = 100;
        this.y = 100;
        this.width = 50;
        this.height = 50;
        this.loadImage("../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");

    }

    throw() {
        this.speedY = 5;
        this.applyGravity();
    }  
}