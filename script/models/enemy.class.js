class Enemy extends MovableObject {
    width = 0;
    height = 0;
    currentImage = 0;
    imagesWalking = [];
    chickenSpeed = 0.15 + Math.random() * 0.25;

    constructor(name, number) {
        super();
        this.getCharacterStat(name, number);
        this.x = 400 + (Math.random() * 1000);
        this.y = 480 - this.height - this.yOffset;
        this.loadImage(`../img/brawlnbounce/02_enemies/${name}/${name}${number}/2_walk/WALK_000.png`)
        this.preloadImages(this.imagesWalking, `../img/brawlnbounce/02_enemies/${name}/${name}${number}/2_walk/WALK_00`, 10);
        this.animate();
    }

    getCharacterStat(name, number) {
        if (name == "ork") {
            this.checkOrkType(number);
            this.offset = { top: 120, bottom: 30, left: 55, right: 70 };
        } else if (name == "troll" && number == 1) {
            this.checkTrollType(number);
            this.offset = { top: 120, bottom: 30, left: 40, right: 60 };
        }
    }

    checkTrollType(number) {
        if (number == 1) {
            this.setEnemyStats(20, 300, 350, 300);
        } else if (number == 2) {
            this.setEnemyStats(20, 300, 350, 350);
        } else if (number == 3) {
            this.setEnemyStats(20, 300, 350, 400);
        }
    }

    checkOrkType(number) {
        if (number == 1) {
            this.setEnemyStats(30, 200, 250, 100);
        } else if (number == 2) {
            this.setEnemyStats(30, 200, 250, 150);
        } else if (number == 3) {
            this.setEnemyStats(30, 200, 250, 200);
        }
    }

    setEnemyStats(yOffset, width, height, energy) {
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;
        this.energy = energy;
    }


    getStatsOrk3() {
        
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