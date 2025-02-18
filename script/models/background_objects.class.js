class backgroundObject extends MovableObject {
    height = 360;

    constructor(path, x) {
        super();
        this.x = x;
        this.y = 480 - this.height;
        this.width = 720;
        this.loadImage(path);
    }
}