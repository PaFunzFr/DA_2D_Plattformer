class Endboss extends MovableObject {
    width = 670;
    height = 470;
    currentImage = 0;
    imagesWalking = [];
    imagesAttacking = [];
    imagesHurt = [];
    imagesDead = [];
    bossSpeed = 0.25;
    floatingRange = 50;
    floatingSpeed = 2;
    initialY;
    energy = 1000;
    movingUp = false;
    isAttacking = false;
    yOffset = -120;
    attack;

    constructor() {
        super();
        this.name = "dragon";
        this.attack ="fireball"
        this.otherDirection = true;
        this.offset = { top: 120, bottom: 190, left: 220, right: 220 };
        this.x = 300; //2100;
        this.y = 480 - this.height - this.yOffset;
        this.initialY = this.y;
        this.loadImage("../img/brawlnbounce/03_endboss/dragon1/7_fly/Dragon_fly_000.png");
        this.preloadImages(this.imagesWalking, "../img/brawlnbounce/03_endboss/dragon1/7_fly/Dragon_fly_00", 10);
        this.preloadImages(this.imagesAttacking, "../img/brawlnbounce/03_endboss/dragon1/6_attack/Dragon_attack_00", 10);
        this.preloadImages(this.imagesHurt, "../img/brawlnbounce/03_endboss/dragon1/4_hurt/Dragon_hurt_00", 6);
        this.preloadImages(this.imagesDead, "../img/brawlnbounce/03_endboss/dragon1/5_dead/Dragon_hurt_00", 10);
        this.animate();
    }

    animate() {
            setInterval(() => {
                if (!this.currentlyDying && !this.isAttacking) {
                this.playAnimation(this.imagesWalking);
                }
                if (this.isHurt() && !this.currentlyDying) {
                        this.playAnimation(this.imagesHurt);
                }
                if (this.isAttacking) {
                    this.playAnimation(this.imagesAttacking)
                }
            }, 60);

            setInterval(() => {
                if (!this.currentlyDying && !this.isAttacking) {
                this.floatMovement();
                } else if (this.isDead()) {
                    this.fallToGround();
                }
            }, 30);
    }

    fallToGround() {
        if (!this.onGround) {
            this.y += this.floatingSpeed * 2.5;
            if (this.y >= this.initialY) { 
                this.y = this.initialY - 60; 
                this.onGround = true;
            }
        }
    }
    
    currentPositionY = 0;
    floatMovement() {
        if (this.movingUp) {
            this.y -= this.floatingSpeed;
            this.currentPositionY = this.y;
            if (this.y <= this.initialY - this.floatingRange) {
                this.movingUp = false;
            }
        } else {
            this.y += this.floatingSpeed;
            this.currentPositionY = this.y;
            if (this.y >= this.initialY) {
                this.movingUp = true;
            }
        }
    }
}
