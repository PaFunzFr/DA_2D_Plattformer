class DrawableObject {
    img;
    width;
    height;
    x;
    y;
    currentImage = 0;
    otherDirection = false;

    // loadImage("./assets/images/picture.png")
    loadImage(path) {
        this.img = new Image(); // = <img>
        this.img.src = path;
    }

    preloadImages(array, path, imageCount) {
        for (let index = 0; index < imageCount; index++) {
            let img = new Image();
            img.src = `${path}${index}.png`;
            array.push(img);            
        }
        //console.log(array);
    }
    
    drawCollisionBody(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof Endboss || this instanceof ThrowableObject) {
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

    drawCollisionBodyJump(ctx) {
        if (this instanceof Enemy && this.name != "troll") {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.x + this.offset.left + 15, 
                this.y + 120,
                this.width - this.offset.left - this.offset.right - 30, 
                this.height - 240
            );
            ctx.stroke();
        }
    }

}

