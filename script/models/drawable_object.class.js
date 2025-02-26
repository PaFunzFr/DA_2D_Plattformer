class DrawableObject {
    img;
    width;
    height;
    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    };
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
            console.log(img.src);         
        }
    }
    
    drawCollisionBody(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Collectable) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.x + this.offset.left, 
                this.y + this.offset.top, 
                this.width - this.offset.left - this.offset.right, 
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }

    playAnimation(array) {
        let index = this.currentImage % array.length;
        this.img = array[index];
        this.currentImage ++
    }
}

