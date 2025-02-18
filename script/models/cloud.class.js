class Cloud extends MovableObject {
    height = 200;
    width= 400;
    speed = 0.15 + Math.random() * 0.4;

    constructor(path, xOffset, yOffset) {
        super();
        this.loadImage(path)
        this.y = 30 + yOffset;
        this.x = xOffset + Math.random() * 200;
        this.animate();
    }
    animate() {
        this.moveLeft(this.speed);
        setInterval(() => {
            if (this.x < -this.width) {
                this.x = 800 + Math.random() * 200;
            }
        }, 1000 / 60);
    }
}