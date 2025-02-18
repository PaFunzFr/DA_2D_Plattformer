class Enemy extends MovableObject {
    constructor() {
        super();
        this.x = 200 + (Math.random() * 500);
        this.y = 350;
        this.width = 100;
        this.height = 120;
        this.loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png")
    }
}