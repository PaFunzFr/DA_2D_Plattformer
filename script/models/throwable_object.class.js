class ThrowableObject extends MovableObject {

    speedY = 0;
    speedX = 10;
    acceleration = 0.5;
    elementOnGround = 370;
    otherDirection = false;

    constructor(x, y, name, otherDirection = false) {
        super();
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.otherDirection = otherDirection;
        this.loadImage(`../img/brawlnbounce/05_throwables/${name}/${name}.png`);
        this.throw();
    }

    throw() {
        this.speedY = 5;
        this.applyGravity();
    }  
}