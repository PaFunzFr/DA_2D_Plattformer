class MovableObject extends DrawableObject {
    yOffset = 50;
    energy = 100;
    lastHit = 0;

    attackingFromAbove = false;
    currentlyDying = false;
    killed = false; // check if it is used

    moveRight(speed) {
        this.x += speed;
        this.otherDirection = false;
    }

    moveLeft(speed) {
        this.x -= speed;
        this.otherDirection = true;
    }
    
    jump() {
        if(!this.isJumping) {
            sounds.character.jump.play();
            this.isJumping = true;
            this.speedY = 11;
        }
    }

    hit(damage) {
        if (this.character) {
            playSound('character', 'hurt'); // hitsound character
        }
        if (this.name) {
            playSound(this.name, 'hurt');
        }
        this.energy -= damage;
        if(this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        return timepassed < 500; 
    }

  

    isColliding(obj) {
        return (
            (this.x + this.width - this.offset.right) > (obj.x + obj.offset.left) &&
            (this.y + this.height - this.offset.bottom) > (obj.y + obj.offset.top) &&
            (this.x + this.offset.left) < (obj.x + obj.width -obj.offset.right) &&
            (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom)
        );
    }

    isApproaching(obj, distance) {
        return (
            (this.x + this.width - this.offset.right + distance) > obj.x + obj.offset.left &&
            (this.x + this.offset.left) < (obj.x + obj.width - obj.offset.right)
        );
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration; 

                if (this instanceof Character && this.y < 210) {
                    this.attackingFromAbove = true;
                    console.log("attacking from above ground"); // is attacking while jumping
                }
                if (this instanceof ThrowableObject) {
                    this.x += this.speedX;
                }
                this.isOnGround();
            }
        }, 1000/60);
    }

    // ONLY FOR MISSILES (DRAGONS) used in THROWABLEOBJECT
    fireMissile() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= 0.02; // acceleration
                this.x += this.speedX;
                this.isOnGround();
            }
        }, 1000/60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y + this.yOffset < 330
        }
    }

    isOnGround() {
        if (this.y >= this.elementOnGround) {
            this.y = this.elementOnGround;
            this.speedY = 0;
            if (this instanceof ThrowableObject) {
                this.speedX = 0;
            }
            this.isJumping = false;
            this.attackingFromAbove = false;
            this.currentImage = 0; // reset animation
            return true;
        }
        return false;
    }
}

