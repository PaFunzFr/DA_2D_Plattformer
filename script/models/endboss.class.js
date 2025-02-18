class Endboss extends MovableObject {
    width = 300;
    height = 370;
    currentImage = 0;
    imagesWalking = [];
    bossSpeed = 0.25;

    constructor() {
        super();
        this.x = 700 + (Math.random() * 200);
        this.y = 480 - this.height - this.yOffset + 20;
        this.loadImage("../img/4_enemie_boss_chicken/2_alert/A1.png")
        this.preloadImages(this.imagesWalking, "img/4_enemie_boss_chicken/2_alert/A", 8);
        this.animate();

    }

    animate() {
        //this.moveLeft(this.bossSpeed);
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 150);
    }
}