class MovableObject extends DrawableObject {
    yOffset = 50;
    otherDirection = false;
    energy = 100;
    lastHit = 0;



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
            this.speedY = 10;
        }
    }

    drawCollisionBody(ctx) {
        if (this instanceof Character || this instanceof Enemy) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(
                this.x + this.offset.left, 
                this.y + this.offset.top, 
                this.width - this.offset.left - this.offset.right, 
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
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
        this.currentImage ++
    }

    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    };

    isColliding(obj) {
        return (
            (this.x + this.width - this.offset.right) >= (obj.x + obj.offset.left) && 
            (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) && 
            (this.y + this.yOffset + this.height - this.offset.bottom) >= (obj.y + obj.offset.top) && 
            (this.y + this.yOffset + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom) && 
            !(this.speedY > 0 && this.y + this.height - this.offset.bottom - 20 <= obj.y + obj.offset.top) // no hit if character dropping
        );
    }
    

}

