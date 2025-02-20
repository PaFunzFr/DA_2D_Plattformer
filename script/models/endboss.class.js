class Endboss extends MovableObject {
    width = 670;
    height = 470;
    currentImage = 0;
    imagesWalking = [];
    bossSpeed = 0.25;
    floatingRange = 50;
    floatingSpeed = 1;
    initialY;
    movingUp = true; // Richtung des Schwebens

    constructor() {
        super();
        this.otherDirection = true;
        this.offset = { top: 120, bottom: 100, left: 220, right: 220 };
        this.x = 2100;
        this.y = 480 - this.height - this.yOffset + 20;
        this.initialY = this.y;
        this.loadImage("../img/brawlnbounce/03_endboss/dragon1/7_fly/Dragon_fly_000.png");
        this.preloadImages(this.imagesWalking, "../img/brawlnbounce/03_endboss/dragon1/7_fly/Dragon_fly_00", 10);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 150);

        setInterval(() => {
            this.floatMovement();
        }, 30);
    }

    floatMovement() {
        if (this.movingUp) {
            this.y -= this.floatingSpeed;
            if (this.y <= this.initialY - this.floatingRange) {
                this.movingUp = false;
            }
        } else {
            this.y += this.floatingSpeed;
            if (this.y >= this.initialY) {
                this.movingUp = true;
            }
        }
    }
}
