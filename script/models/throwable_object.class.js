class ThrowableObject extends MovableObject {

    speedY = 0;
    speedX = 5;
    acceleration = 0.5;
    elementOnGround = 370;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.loadImage("../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.throw();

    }

    throw() {
        this.speedY = 5;
        this.applyGravity();
    }  
}