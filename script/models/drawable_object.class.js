class DrawableObject {
    img;
    width;
    height;
    x;
    y;
    currentImage = 0;

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

    drawElement(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

}