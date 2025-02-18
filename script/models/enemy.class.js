class Enemy extends MovableObject {
    width = 50;
    height = 70;
    currentImage = 0;
    imagesWalking = [];
    chickenSpeed = 0.15 + Math.random() * 0.25;

    constructor() {
        super();
        this.x = 200 + (Math.random() * 500);
        this.y = 480 - this.height - this.yOffset;
        this.loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/w_1.png")
        this.preloadImages(this.imagesWalking, "img/3_enemies_chicken/chicken_normal/1_walk/w_", 3);
        this.animate();
        this.moveLeft(this.chickenSpeed, false);
    }

    animate() {
        setInterval(() => {
            let index = this.currentImage % this.imagesWalking.length;
            this.img = this.imagesWalking[index];
            this.currentImage ++
        }, 150);
        console.log(this.img);
    }
}