class Character extends MovableObject {
    width = 150;
    height = 150;
    currentImage = 0;
    imagesIdle = [];
    imagesWalking = [];
    imagesJumping = [];
    imagesHurt = [];
    imagesDead = [];
    imagesAttack = [];
    isJumping = false;
    x = 290;
    speedX = 10;
    speedY = 0;
    acceleration = 0.5;
    yOffset = 0;
    elementOnGround = 480 - this.height - this.yOffset;
    energy = 100;

    constructor() { 
        super();
        this.y = this.elementOnGround;
        this.offset = { top: 20, bottom: 40, left: 40, right: 40 };
        this.loadImage("../img/brawlnbounce/01_characters/axe/1_idle/IDLE_000.png");
        this.preloadImages(this.imagesIdle, "../img/brawlnbounce/01_characters/axe/1_idle/IDLE_00", 5);
        this.preloadImages(this.imagesWalking, "../img/brawlnbounce/01_characters/axe/2_walk/WALK_00", 5);
        this.preloadImages(this.imagesJumping, "../img/brawlnbounce/01_characters/axe/3_jump/JUMP_00", 5);
        this.preloadImages(this.imagesHurt, "../img/brawlnbounce/01_characters/axe/4_hurt/HURT_00", 5);
        this.preloadImages(this.imagesDead, "../img/brawlnbounce/01_characters/axe/5_dead/DIE_00", 5);
        this.preloadImages(this.imagesAttack, "../img/brawlnbounce/01_characters/axe/6_attack/ATTACK_00", 5)
        this.applyGravity();
        this.animate();
    }


    animate() {
        this.isOnGround();
            setInterval(() => {
                if (this.world.keyboard.clickedRight && this.x < this.world.level.levelEndX) {
                    this.moveRight(this.speedX);
                }
                if (this.world.keyboard.clickedLeft && this.x > -719) {
                    this.moveLeft(this.speedX);
                }
                if (this.world.keyboard.clickedUp || this.world.keyboard.clickedSpace) {
                    this.jump();
                }
                this.world.cameraX = -(this.x - 290); // - offsetX from character to canvas border
            }, 1000/60);

            // ANIMATION SET (PICTURES)
            setInterval(() => {
                if (this.isAboveGround()) {
                    this.playAnimation(this.imagesJumping);
                } else {
                    if (!this.isJumping && this.world.keyboard.clickedRight || this.world.keyboard.clickedLeft) {
                        this.playAnimation(this.imagesWalking);
                    } else if (this.isHurt()) {
                        this.playAnimation(this.imagesHurt);
                    } else if (this.world.keyboard.clickedD) {
                        this.playAnimation(this.imagesAttack);
                    } else {
                        this.playAnimation(this.imagesIdle);
                    }
                }
            }, 100);
    }

    
}
