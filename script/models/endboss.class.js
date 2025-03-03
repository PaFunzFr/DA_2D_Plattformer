class Endboss extends MovableObject {
    width = 670;
    height = 470;
    enemySpeed = 0;
    currentImage = 0;
    imagesWalking = [];
    imagesAttacking = [];
    imagesHurt = [];
    imagesDead = [];
    bossSpeed = 0.25;
    floatingRange = 50;
    floatingSpeed = 2;
    initialY;
    energy = 100;
    movingUp = false;
    isAttacking = false;
    yOffset = -120;
    attack;
    level;

    constructor(level) {
        super();
        this.name = "dragonBoss";
        this.level = level;
        this.attackDragon = "fireball";
        this.otherDirection = true;
        this.offset = { top: 120, bottom: 190, left: 220, right: 220 };
        this.x = 4400;
        this.y = 480 - this.height - this.yOffset;
        this.initialY = this.y;
        this.loadImage(`./img/03_endboss/dragon${level}/7_fly/Dragon_fly_000.png`);
        this.preloadImages(this.imagesWalking, `./img/03_endboss/dragon${level}/7_fly/Dragon_fly_00`, 10);
        this.preloadImages(this.imagesAttacking, `./img/03_endboss/dragon${level}/6_attack/Dragon_Attack_00`, 10);
        this.preloadImages(this.imagesHurt, `./img/03_endboss/dragon${level}/4_hurt/Dragon_hurt_00`, 6);
        this.preloadImages(this.imagesDead, `./img/03_endboss/dragon${level}/5_dead/Dragon_hurt_00`, 10);
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
                    this.moveLeft(this.enemySpeed);
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
