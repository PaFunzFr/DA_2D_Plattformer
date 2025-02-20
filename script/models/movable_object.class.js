class MovableObject extends DrawableObject {
    yOffset = 50;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    };

    moveRight(speed) {
        this.x += speed;
        //this.walkingSound.play();
        this.otherDirection = false;
    }

    moveLeft(speed) {
        this.x -= speed;
        //this.walkingSound.play();
        this.otherDirection = true;
    }
    
    jump() {
        if(!this.isJumping) {
            this.isJumping = true;
            this.speedY = 12;
        }
    }

    hit() {
        this.energy -= 5;
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

    playAnimation(array) {
        let index = this.currentImage % array.length;
        this.img = array[index];
        //this.width = this.img.width;
        //this.height = this.img.height;
        this.currentImage ++
    }

    isColliding(obj) {
        return (
            (this.x + this.width - this.offset.right) > (obj.x + obj.offset.left) &&
            (this.y + this.height - this.offset.bottom) > (obj.y + obj.offset.top) &&
            (this.x + this.offset.left) < (obj.x + obj.width -obj.offset.right) &&
            (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom)
        );
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration; 
                if (this instanceof ThrowableObject) {
                    this.x += this.speedX;
                }
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
            this.currentImage = 0; // reset animation
            return true;
        }
        return false;
    }

}

