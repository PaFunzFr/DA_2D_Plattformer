class backgroundObject extends MovableObject {
    height = 480;

    constructor(path, x) {
        super();
        this.x = x;
        this.y = 480 - this.height;
        this.width = 5179;
        this.loadImage(path);
    }
}