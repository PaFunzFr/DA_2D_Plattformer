class Enemy extends MovableObject {
    width = 100;
    height = 120;

    constructor() {
        super();
        this.x = 200 + (Math.random() * 500);
        this.y = 480 - this.height;
        this.loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png")
    }
}