/**
 * Class representing a character that can move, jump, and perform actions in the game world.
 */
class Character extends MovableObject {
    width = 150;
    height = 150;
    isJumping = false;
    x = 290;
    speedX = 4.5;
    speedY = 0;
    acceleration = 0.5;
    yOffset = 0;
    elementOnGround = 480 - this.height - this.yOffset;
    energy = 100;
    ignoreDamage = false;
    character;

    /**
     * Creates a new character with the specified name and sets up its images and animations.
     * @param {string} character - The name of the character to load (e.g., "hero").
     */
    constructor(character) { 
        super();
        this.character = character;
        this.y = this.elementOnGround;
        this.offset = { top: 20, bottom: 40, left: 40, right: 40 };
        this.loadImage(`./img/01_characters/${character}/1_idle/IDLE_000.png`);
        this.preloadImages(this.imagesIdle, `./img/01_characters/${character}/1_idle/IDLE_00`, 5);
        this.preloadImages(this.imagesWalking, `./img/01_characters/${character}/2_walk/WALK_00`, 5);
        this.preloadImages(this.imagesJumping, `./img/01_characters/${character}/3_jump/JUMP_00`, 5);
        this.preloadImages(this.imagesHurt, `./img/01_characters/${character}/4_hurt/HURT_00`, 5);
        this.preloadImages(this.imagesDead, `./img/01_characters/${character}/5_dead/DIE_00`, 5);
        this.preloadImages(this.imagesAttack, `./img/01_characters/${character}/6_attack/ATTACK_00`, 5)
        this.applyGravity();
        this.startMovementAfterDelay();
    }

    /**
     * Starts the character's movement after a delay.
     */
    startMovementAfterDelay() {
        setTimeout(() => {
            this.animate();  
        }, 5000);  
    }

    /**
     * Starts the animation loop and frame updates for the character.
     */
    animate() {
        setInterval(() => {
            this.setMovement();
        }, 1000/60);

        setInterval(() => {
            this.setFrames();
        }, 80);
    }

    /**
     * Sets the animation frames based on the character's current state (jumping, walking, idle, etc.).
     */
    setFrames() {
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
    }

    /**
     * Sets the character's movement based on keyboard input (right, left, up, or jump).
     */
    setMovement() {
        if (this.world.keyboard.clickedRight && this.x < this.world.level.levelEndX) {
            this.moveRight(this.speedX);
        }
        if (this.world.keyboard.clickedLeft && this.x > 0) {
            this.moveLeft(this.speedX);
        }
        if (this.world.keyboard.clickedUp || this.world.keyboard.clickedSpace) {
            this.jump();
        }
        this.world.cameraX = -(this.x - 290);
    }
}
