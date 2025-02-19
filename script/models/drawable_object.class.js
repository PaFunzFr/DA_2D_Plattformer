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
            img.src = `${path}${index + 1}.png`;
            array.push(img);            
        }
        console.log(array);
    }
    
    drawCollisionBody(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof Endboss) {
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

}

