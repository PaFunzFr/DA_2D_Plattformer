class Character extends MovableObject {
    width = 150;
    height = 300;
    currentImage = 0;
    imagesWalking = [];
    imagesJumping = [];
    isJumping = false;

    constructor() {
        super();
        this.x = 100;
        this.y = 480 - this.height - this.yOffset;
        this.loadImage("../img/2_character_pepe/2_walk/W-1.png");
        this.preloadImages(this.imagesWalking, "../img/2_character_pepe/2_walk/W-", 6);
        this.preloadImages(this.imagesJumping, "../img/2_character_pepe/3_jump/J-", 9);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isJumping) {
                this.loopingImagesFromArray(this.imagesWalking);
            }
        }, 150);
    }

    jump() {
        if (this.isJumping) return;
        this.isJumping = true;
        this.currentImage = 0;
        let jumpInterval = setInterval(() => {
            this.loopingImagesFromArray(this.imagesJumping);
            if (this.currentImage >= this.imagesJumping.length) {
                this.endJump(jumpInterval);
            }
        }, 200);
    }
    
    loopingImagesFromArray(array) {
        let index = this.currentImage % array.length; // modulo used for loop
        this.img = array[index];
        this.currentImage++;
    }
    
    endJump(interval) {
        clearInterval(interval);
        this.isJumping = false;
    }
}
