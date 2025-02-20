class Endboss extends MovableObject {
    width = 670;
    height = 470;
    currentImage = 0;
    imagesWalking = [];
    bossSpeed = 0.25;

    constructor() {
        super();
        this.otherDirection = true;
        this.offset = { top: 120, bottom: 100, left: 220, right: 220 };
        this.x = 2100;// + (Math.random() * 50);
        this.y = 480 - this.height - this.yOffset + 20;
        this.loadImage("../img/brawlnbounce/03_endboss/dragon1/7_fly/Dragon_fly_000.png")
        this.preloadImages(this.imagesWalking, "../img/brawlnbounce/03_endboss/dragon1/7_fly/Dragon_fly_00", 10);
        this.animate();
    }

    animate() {
        //this.moveLeft(this.bossSpeed);
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 150);
    }
}