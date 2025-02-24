class Endboss extends MovableObject {
    width = 670;
    height = 470;
    currentImage = 0;
    imagesWalking = [];
    imagesAttacking = [];
    imagesDead = [];
    bossSpeed = 0.25;
    floatingRange = 50;
    floatingSpeed = 1;
    initialY;
    energy = 1000;
    movingUp = false;
    name = "dragon";

    constructor() {
        super();
        this.otherDirection = true;
        this.offset = { top: 120, bottom: 100, left: 220, right: 220 };
        this.x = 2100;
        this.y = 480 - this.height - this.yOffset + 20;
        this.initialY = this.y;
        this.loadImage("../img/brawlnbounce/03_endboss/dragon1/7_fly/Dragon_fly_000.png");
        this.preloadImages(this.imagesWalking, "../img/brawlnbounce/03_endboss/dragon1/7_fly/Dragon_fly_00", 10);
        this.preloadImages(this.imagesAttacking, "../img/brawlnbounce/03_endboss/dragon1/7_fly/Dragon_fly_00", 10);
        this.preloadImages(this.imagesDead, "../img/brawlnbounce/03_endboss/dragon1/5_dead/Dragon_hurt_00", 10);
        this.animate();
    }

    animate() {
            setInterval(() => {
                if (!this.currentlyDying) {
                this.playAnimation(this.imagesWalking);
                }
            }, 150);

            setInterval(() => {
                if (!this.currentlyDying) {
                this.floatMovement();
                } else if (this.isDead()) {
                    this.fallToGround();
                }
            }, 30);
    }

    fallToGround() {
        if (!this.onGround) {
            this.y += this.floatingSpeed *2.5;
            
            if (this.y >= this.groundY) { 
                this.y = this.groundY;  // Stelle sicher, dass er nicht durch den Boden fällt
                this.onGround = true;   // Markiere, dass er den Boden erreicht hat
            }
        }
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
