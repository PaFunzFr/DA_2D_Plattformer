class Enemy extends MovableObject {
    width = 0;
    height = 0;
    currentImage = 0;
    imagesWalking = [];
    imagesAttacking = [];
    imagesHurt = [];
    imagesDead = [];
    enemySpeed = 0;
    name;

    constructor(name, number, positionX) {
        super();
        this.x = positionX;
        this.name = name;
        this.getCharacterStat(name, number);
        this.y = 480 - this.height - this.yOffset;
        this.loadImage(`../img/brawlnbounce/02_enemies/${name}/${name}${number}/6_attack/ATTACK_000.png`)
        this.preloadImages(this.imagesWalking, `../img/brawlnbounce/02_enemies/${name}/${name}${number}/2_walk/WALK_00`, 10);
        this.preloadImages(this.imagesAttacking, `../img/brawlnbounce/02_enemies/${name}/${name}${number}/6_attack/ATTACK_00`, 10);
        this.preloadImages(this.imagesDead, `../img/brawlnbounce/02_enemies/${name}/${name}${number}/5_dead/DIE_00`, 10);
        this.preloadImages(this.imagesHurt, `../img/brawlnbounce/02_enemies/${name}/${name}${number}/4_hurt/HURT_00`, 10);
        this.animate();
    }

    getCharacterStat(name, number) {
        if (name == "ork") {
            this.getOrkType(number);
        } else if (name == "troll" && number == 1) {
            this.getTrollType(number);
        }
    }

    getTrollType(number) {
        this.setTrollMetaStats();
        if (number == 1) {
            this.setEnemyStats(-50, 360, 460, 300);
        } else if (number == 2) {
            this.setEnemyStats(-30, 300, 350, 350);
        } else if (number == 3) {
            this.setEnemyStats(-30, 300, 350, 400);
        }
    }

    setTrollMetaStats() {
        this.enemySpeed = 0.15 + Math.random() * 0.25;
        this.offset = { top: 190, bottom: 70, left: 60, right: 100 };
    }

    setOrkMetaStats() {
        this.enemySpeed = 0.45 + Math.random() * 0.55;
        this.offset = { top: 120, bottom: 30, left: 55, right: 70 };
    }

    getOrkType(number) {
        this.setOrkMetaStats();
        if (number == 1) {
            this.setEnemyStats(0, 200, 250, 100);
        } else if (number == 2) {
            this.setEnemyStats(0, 200, 250, 150);
        } else if (number == 3) {
            this.setEnemyStats(0, 200, 250, 200);
        }
    }

    setEnemyStats(yOffset, width, height, energy) {
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;
        this.energy = energy;
    }

    animate() {
        setInterval(() => {
            if (!this.currentlyDying) {
                this.moveLeft(this.enemySpeed);
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isHurt() && !this.currentlyDying) {
                if (this.name == "ork" || this.name == "troll") {
                    this.playAnimation(this.imagesHurt);
                }
            }
        }, 100);
    }
}