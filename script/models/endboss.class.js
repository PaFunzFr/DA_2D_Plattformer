class Endboss extends MovableObject {
    width = 470;
    height = 470;
    currentImage = 0;
    imagesWalking = [];
    bossSpeed = 0.25;

    constructor() {
        super();
        this.offset = { top: 120, bottom: 0, left: 120, right: 120 };
        this.x = 700 + (Math.random() * 200);
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