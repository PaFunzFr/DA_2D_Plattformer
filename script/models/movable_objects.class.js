class MovableObject {

    x;
    y;
    img;
    width;
    height;

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

