class Cloud extends MovableObject {
    height = 200;
    width= 400;

    constructor(path, xOffset, yOffset) {
        super();
        this.loadImage("../img/5_background/layers/4_clouds/1.png")
        this.y = 30 + yOffset;
        this.x = xOffset + Math.random() * 200;
        this.animate(xOffset);
    }
    animate(xOffset) {
        setInterval(() => {
            this.x -= 0.15;
            if (this.x < -this.width) {
                this.x = 780 + Math.random() * 200;
            }
        }, 1000 / 60);
}}