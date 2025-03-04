/**
 * Represents an Endboss in the game that moves, floats, attacks, and reacts to being hurt or dead.
 * Extends from the `MovableObject` class.
 */
class Endboss extends MovableObject {
    width = 670;
    height = 470;
    enemySpeed = 0;
    bossSpeed = 0.25;
    floatingRange = 50;
    floatingSpeed = 2;
    initialY;
    energy = 100;
    movingUp = false;
    isAttacking = false;
    yOffset = -120;
    currentPositionY = 0;
    attack;
    level;

    /**
     * Creates an instance of the Endboss.
     * @param {number} level - The level of the Endboss.
     */
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
        this.preloadImages(this.imagesAttack, `./img/03_endboss/dragon${level}/6_attack/Dragon_Attack_00`, 10);
        this.preloadImages(this.imagesHurt, `./img/03_endboss/dragon${level}/4_hurt/Dragon_hurt_00`, 6);
        this.preloadImages(this.imagesDead, `./img/03_endboss/dragon${level}/5_dead/Dragon_hurt_00`, 10);
        this.animate();
    }

    /**
     * Manages the animation and movement of the Endboss.
     * The method runs at intervals to update the animation frames and movement behavior.
     * It plays walking, hurt, or attack animations and controls the Endboss's movement.
     */
    animate() {
        setInterval(() => {
            this.setFrames();
        }, 60);

        setInterval(() => {
            this.setMovement();
        }, 30);
    }

    /**
     * Updates the animation frames based on the Endboss's current state.
     * It plays different animations depending on whether the Endboss is walking, hurt, or attacking.
     */
    setFrames() {
        if (!this.currentlyDying && !this.isAttacking) {
            this.playAnimation(this.imagesWalking);
        }
        if (this.isHurt() && !this.currentlyDying) {
            this.playAnimation(this.imagesHurt);
        }
        if (this.isAttacking) {
            this.playAnimation(this.imagesAttack)
        }
    }

    /**
     * Controls the movement of the Endboss based on its current state.
     * The Endboss will float, move left, or fall to the ground depending on whether it is attacking, dying, or dead.
     */
    setMovement() {
        if (!this.currentlyDying && !this.isAttacking) {
            this.floatMovement();
            this.moveLeft(this.enemySpeed);
        } else if (this.isDead()) {
            this.fallToGround();
        }
    }

    /**
     * Handles the Endboss falling to the ground when it is dead.
     * Adjusts the Y position of the Endboss until it reaches the ground.
     */
    fallToGround() {
        if (!this.onGround) {
            this.y += this.floatingSpeed * 2.5;
            if (this.y >= this.initialY) { 
                this.y = this.initialY - 60; 
                this.onGround = true;
            }
        }
    }
    

    /**
     * Controls the vertical floating movement of the Endboss.
     * The Endboss moves up and down within a specified floating range.
     * When the Endboss reaches the top or bottom of the range, the movement direction is reversed.
     */
    floatMovement() {
        if (this.movingUp) {
            this.y -= this.floatingSpeed;
            this.currentPositionY = this.y;
            this.movingDownIfTopReached();
        } else {
            this.y += this.floatingSpeed;
            this.currentPositionY = this.y;
            this.movingUpIfBottomReached();
        }
    }

    /**
     * Checks if the Endboss has reached the top of the floating range.
     * If the top is reached, the Endboss will reverse direction and start moving down.
     */
    movingDownIfTopReached() {
        if (this.y <= this.initialY - this.floatingRange) {
            this.movingUp = false;
        }
    }

    /**
     * Checks if the Endboss has reached the bottom position.
     * If the bottom is reached, the Endboss will reverse direction and start moving up.
     */
    movingUpIfBottomReached() {
        if (this.y >= this.initialY) {
            this.movingUp = true;
        }
    }

}
