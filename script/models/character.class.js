class Character extends MovableObject {
    width = 150;
    height = 300;
    currentImage = 0;
    imagesWalking = [];
    imagesJumping = [];
    imagesIdle = [];
    imagesDead = [];
    imagesHurt = [];
    isJumping = false;
    x = 200;
    jumpHeight = 90;
    speedX = 10;
    speedY = 0;
    acceleration = 0.5;
    elementOnGround = 480 - this.height - this.yOffset;

    constructor() {
        super();
        this.y = this.elementOnGround;
        this.offset = { top: 80, bottom: 0, left: 40, right: 40 };
        this.loadImage("../img/2_character_pepe/2_walk/W-1.png");
        this.preloadImages(this.imagesWalking, "../img/2_character_pepe/2_walk/W-", 6);
        this.preloadImages(this.imagesJumping, "../img/2_character_pepe/3_jump/J-", 9);
        this.preloadImages(this.imagesIdle, "../img/2_character_pepe/1_idle/idle/I-", 10);
        this.preloadImages(this.imagesDead, "../img/2_character_pepe/5_dead/D-", 7);
        this.preloadImages(this.imagesHurt, "../img/2_character_pepe/4_hurt/H-", 3);
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
                this.world.cameraX = -(this.x - 200); // - offsetX from character to canvas border
            }, 1000/60);

            // ANIMATION SET (PICTURES)
            setInterval(() => {
                if (this.isAboveGround()) {
                    this.playAnimation(this.imagesJumping);
                } else {
                    if (!this.isJumping && this.world.keyboard.clickedRight || this.world.keyboard.clickedLeft) {
                        this.playAnimation(this.imagesWalking);
                    } else if (this.isDead()) {
                        this.playAnimation(this.imagesDead);
                    } else if (this.isHurt()) {
                        this.playAnimation(this.imagesHurt);
                    } else {
                        this.playAnimation(this.imagesIdle);
                    }
                }
            }, 100);
    }
}
