class Character extends MovableObject {
    width = 150;
    height = 300;
    currentImage = 0;
    imagesWalking = [];
    imagesJumping = [];
    imagesIdle = [];
    isJumping = false;
    x = 0;
    characterSpeed = 10;
    jumpHeight = 90
    speedY = 0;
    acceleration = 0.5;
    characterOnGround = 480 - this.height - this.yOffset;

    constructor() {
        super();
        this.y = this.characterOnGround;
        this.loadImage("../img/2_character_pepe/2_walk/W-1.png");
        this.preloadImages(this.imagesWalking, "../img/2_character_pepe/2_walk/W-", 6);
        this.preloadImages(this.imagesJumping, "../img/2_character_pepe/3_jump/J-", 9);
        this.preloadImages(this.imagesIdle, "../img/2_character_pepe/1_idle/idle/I-", 10);
        this.applyGravity();
        this.animate();
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration; 
                this.isOnGround();
            }
        }, 1000/60);
    }

    isAboveGround() {
        return this.y + this.yOffset < 180
    }

    isOnGround() {
        if (this.y >= this.characterOnGround) {
            this.y = this.characterOnGround;
            this.speedY = 0; 
            this.isJumping = false;
            this.currentImage = 0; // reset animation
        }
    }

    animate() {
        this.isOnGround();
            setInterval(() => {
                if (this.world.keyboard.clickedRight && this.x < this.world.level.levelEndX) {
                    this.x += this.characterSpeed;
                    //this.walkingSound.play();
                    this.otherDirection = false;
                }

                if (this.world.keyboard.clickedLeft && this.x > -719) {
                    this.x -= this.characterSpeed;
                    //this.walkingSound.play();
                    this.otherDirection = true;
                }
                
                if (this.world.keyboard.clickedUp && !this.isJumping) {
                    this.isJumping = true;
                    this.speedY = 10;
                }

                this.world.cameraX = -this.x;
            }, 1000/60);

            // ANIMATION SET (PICTURES)
            setInterval(() => {
                if (this.isAboveGround()) {
                    this.playAnimation(this.imagesJumping);
                } else {
                    if (!this.isJumping && this.world.keyboard.clickedRight || this.world.keyboard.clickedLeft) {
                        this.playAnimation(this.imagesWalking);
                    } else {
                        this.playAnimation(this.imagesIdle);
                    }
                }
            }, 100);
    }

}
