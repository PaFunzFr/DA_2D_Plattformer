class Enemy extends MovableObject {
    width = 0;
    height = 0;
    currentImage = 0;
    imagesWalking = [];
    chickenSpeed = 0.15 + Math.random() * 0.25;

    constructor(name, number) {
        super();
        this.yOffset = 20;
        this.getCharacterStat(name);
        this.x = 400 + (Math.random() * 1000);
        this.y = 480 - this.height - this.yOffset;
        this.loadImage(`../img/brawlnbounce/02_enemies/${name}/${name}${number}/2_walk/WALK_000.png`)
        this.preloadImages(this.imagesWalking, `../img/brawlnbounce/02_enemies/${name}/${name}${number}/2_walk/WALK_00`, 10);
        this.animate();
    }


    getCharacterStat(name) {
        if (name == "ork") {
            this.width = 150;
            this.height = 250;
            this.offset = { top: 120, bottom: 30, left: 40, right: 60 };
        } else if (name == "troll") {
            this.width = 300;
            this.height = 350;
            this.offset = { top: 120, bottom: 30, left: 40, right: 60 };
        }
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