class Cloud extends MovableObject {
    y = 30;
    height = 200;

    constructor() {
        super();
        this.x = -100 + Math.random() * 600;
        this.width = 400;
        this.loadImage("../img/5_background/layers/4_clouds/1.png")
    }
}