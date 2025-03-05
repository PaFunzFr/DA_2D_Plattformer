/**
 * Represents a movable object in the game, typically used for characters or throwable objects.
 * Inherits from the DrawableObject class.
 */
class MovableObject extends DrawableObject {
    yOffset = 50;
    energy = 100;
    lastHit = 0;
    currentImage = 0;
    imagesIdle = [];
    imagesWalking = [];
    imagesJumping = [];
    imagesHurt = [];
    imagesDead = [];
    imagesAttack = [];
    attackingFromAbove = false;
    currentlyDying = false;
    killed = false;

    /**
     * Moves the object to the right.
     * @param {number} speed - The speed at which the object should move to the right.
     */
    moveRight(speed) {
        this.x += speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left.
     * @param {number} speed - The speed at which the object should move to the left.
     */
    moveLeft(speed) {
        this.x -= speed;
        this.otherDirection = true;
    }
    
    /**
     * Makes the object jump if it's not already jumping.
     */
    jump() {
        if(!this.isJumping) {
            sounds.character.jump.play();
            this.isJumping = true;
            this.speedY = 11;
        }
    }

    /**
     * Applies damage to the object, reducing its energy.
     * @param {number} damage - The amount of damage to apply.
     */
    hit(damage) {
        this.triggerHurtSound();
        this.energy -= damage;
        if(this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Triggers the hurt sound effect.
     */
    triggerHurtSound() {
        if (this.character) {
            playSound('character', 'hurt');
        }
        if (this.name) {
            playSound(this.name, 'hurt');
        }
    }

    /**
     * Checks if the object is dead (energy is 0).
     * @returns {boolean} True if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the object was recently hurt.
     * @returns {boolean} True if the object was hurt within the last 500 milliseconds, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        return timepassed < 500; 
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {Object} obj - The object to check for collision with.
     * @returns {boolean} True if the objects are colliding, otherwise false.
     */
    isColliding(obj) {
        return (
            (this.x + this.width - this.offset.right) > (obj.x + obj.offset.left) &&
            (this.y + this.height - this.offset.bottom) > (obj.y + obj.offset.top) &&
            (this.x + this.offset.left) < (obj.x + obj.width -obj.offset.right) &&
            (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom)
        );
    }

    /**
     * Checks if the object is approaching another object within a certain distance.
     * @param {Object} obj - The object to check against.
     * @param {number} distance - The distance within which to check for approach.
     * @returns {boolean} True if the object is approaching, otherwise false.
     */
    isApproaching(obj, distance) {
        return (
            (this.x + this.width - this.offset.right + distance) > obj.x + obj.offset.left &&
            (this.x + this.offset.left) < (obj.x + obj.width - obj.offset.right)
        );
    }

    /**
     * Applies gravity to the object, affecting its vertical speed.
     * This method is called continuously to simulate gravity.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration;
                this.setCharacterJumpAttack(); 
                this.setThrowableSpeedX();
                this.isOnGround();
            }
        }, 1000/60);
    }

    /**
     * Sets the attacking state of the character when jumping.
     * Only applicable if the object is a `Character` and it is above a certain height.
     */
    setCharacterJumpAttack() {
        if (this instanceof Character && this.y < 210) {
            this.attackingFromAbove = true;
        }
    }

    /**
     * Sets the horizontal speed for throwable objects.
     * Only applicable if the object is a `ThrowableObject`.
     */
    setThrowableSpeedX() {
        if (this instanceof ThrowableObject) {
            this.x += this.speedX;
        }
    }

    /**
     * Fires a missile (or throwable object), applying gravity and horizontal movement.
     * This method is called continuously to simulate the missile's movement.
     */
    fireMissile() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= 0.02;
                this.x += this.speedX;
                this.isOnGround();
            }
        }, 1000/60);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y + this.yOffset < 330
        }
    }

    /**
     * Checks if the object is on the ground.
     * If the object is on the ground, it resets vertical speed and status.
     * @returns {boolean} True if the object is on the ground, otherwise false.
     */
    isOnGround() {
        if (this.y >= this.elementOnGround) {
            this.y = this.elementOnGround;
            this.speedY = 0;
            this.stopThrowableObjects();
            this.resetVerticalStatuses();
            this.currentImage = 0;
            return true;
        }
        return false;
    }

    /**
     * Stops the movement of throwable objects when they hit the ground.
     */
    stopThrowableObjects() {
        if (this instanceof ThrowableObject) {
            this.speedX = 0;
        }
    }

    /**
     * Resets the vertical statuses of the object (e.g., jumping, attacking).
     */
    resetVerticalStatuses() {
        this.isJumping = false;
        this.attackingFromAbove = false;
    }
}

