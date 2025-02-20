class Enemy extends MovableObject {
    width = 300;
    height = 350;
    currentImage = 0;
    imagesWalking = [];
    chickenSpeed = 0.15 + Math.random() * 0.25;

    constructor() {
        super();
        this.yOffset = 20;
        this.offset = { top: 120, bottom: 30, left: 40, right: 60 };
        this.x = 400 + (Math.random() * 1000);
        this.y = 480 - this.height - this.yOffset;
        this.loadImage("../img/brawlnbounce/02_enemies/troll/troll1/2_walk/Troll_WALK_000.png")
        this.preloadImages(this.imagesWalking, "./img/brawlnbounce/02_enemies/troll/troll1/2_walk/Troll_WALK_00", 10);
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