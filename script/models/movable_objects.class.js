class MovableObject {
    x;
    y;
    yOffset = 50;
    img;
    width;
    height;
    imageCache = [];

    constructor(x, y, img, width, height) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.width = width;
        this.height = height;
    }

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

    moveRight() {
        console.log("moveRight");
    }

    moveLeft() {
        console.log("moveLeft");
    }
    
    jump() {
        console.log("jumping");
        
    }

}

