class backgroundObject extends MovableObject {
    y = 30;
    height = 200;

    constructor(path) {
        super();
        this.x = -100 + Math.random() * 600;
        this.width = 400;
        this.loadImage(path)
    }
}