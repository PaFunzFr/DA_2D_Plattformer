class Enemy extends MovableObject {
    width = 50;
    height = 70;
    currentImage = 0;
    imagesWalking = [];
    chickenSpeed = 0.15 + Math.random() * 0.25;

    constructor() {
        super();
        this.yOffset = 60;
        this.offset = { top: 10, bottom: 0, left: 10, right: 10 };
        this.x = 400 + (Math.random() * 1000);
        this.y = 480 - this.height - this.yOffset;
        this.loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/w_1.png")
        this.preloadImages(this.imagesWalking, "img/3_enemies_chicken/chicken_normal/1_walk/w_", 3);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft(this.chickenSpeed);
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 150);
    }
}