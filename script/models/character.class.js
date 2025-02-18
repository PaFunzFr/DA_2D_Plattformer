class Character extends MovableObject {
    width = 150;
    height = 300;
    currentImage = 0;
    imagesWalking = [];
    imagesJumping = [];
    isJumping = false;
    x = 0;
    characterSpeed = 10;

    constructor() {
        super();
        this.y = 480 - this.height - this.yOffset;
        this.loadImage("../img/2_character_pepe/2_walk/W-1.png");
        this.preloadImages(this.imagesWalking, "../img/2_character_pepe/2_walk/W-", 6);
        this.preloadImages(this.imagesJumping, "../img/2_character_pepe/3_jump/J-", 9);
        this.animate();
    }

    animate() {
            setInterval(() => {
                if (!this.isJumping && this.world.keyboard.clickedRight && this.x < this.world.level.levelEndX) {
                    this.x += this.characterSpeed;
                    this.otherDirection = false;
                }
                if (!this.isJumping && this.world.keyboard.clickedLeft && this.x > -719) {
                    this.x -= this.characterSpeed;
                    this.otherDirection = true;
                }
                this.world.cameraX = -this.x;
            }, 1000/60);

            setInterval(() => {
                if (!this.isJumping && this.world.keyboard.clickedRight) {
                    this.playAnimation(this.imagesWalking);
                }
                if (!this.isJumping && this.world.keyboard.clickedLeft) {
                    this.playAnimation(this.imagesWalking);
                }
            }, 70);
    }

    jump() {
        if (this.isJumping) return;
        this.isJumping = true;
        this.currentImage = 0;
        let jumpInterval = setInterval(() => {
            this.playAnimation(this.imagesJumping);
            if (this.currentImage >= this.imagesJumping.length) {
                this.endJump(jumpInterval);
            }
        }, 70);
    }
    
    endJump(interval) {
        clearInterval(interval);
        this.isJumping = false;
    }
}
