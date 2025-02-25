class ThrowableObject extends MovableObject {

    speedY = 0;
    speedX = 10;
    acceleration = 0.8;
    elementOnGround = 400;
    otherDirection = false;

    constructor(x, y, name, otherDirection = false) {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.otherDirection = otherDirection;
        this.loadImage(`./img/05_throwables/${name}/${name}.png`);
        this.animate();
    }

    animate() {
        if (this.name != "fireball") {
            this.speedY = 5;
            this.applyGravity();
        } else {
            this.fireMissile();
        }

        console.log(this.x);
        
    }  
}