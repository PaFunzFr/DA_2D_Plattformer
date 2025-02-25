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

    constructor(name, level, positionX) {
        super();
        this.x = positionX;
        this.name = name;
        this.getCharacterStat(name, level);
        this.y = 480 - this.height - this.yOffset;
        this.loadImage(`./img/02_enemies/${name}/${name}${level}/6_attack/ATTACK_000.png`)
        this.preloadImages(this.imagesWalking, `./img/02_enemies/${name}/${name}${level}/2_walk/WALK_00`, 10);
        this.preloadImages(this.imagesAttacking, `./img/02_enemies/${name}/${name}${level}/6_attack/ATTACK_00`, 10);
        this.preloadImages(this.imagesDead, `./img/02_enemies/${name}/${name}${level}/5_dead/DIE_00`, 10);
        this.preloadImages(this.imagesHurt, `./img/02_enemies/${name}/${name}${level}/4_hurt/HURT_00`, 5);
        this.animate();
    }

    getCharacterStat(name, level) {
        if (name == "ork") {
            this.getOrkType(level);
        } else if (name == "troll" && level == 1) {
            this.getTrollType(level);
        } else if (name == "dragon" && level == 1) {
            this.getDragonType(level);
        }
    }

    getTrollType(level) {
        this.setEnemyMetaStats(
            0.15 + Math.random() * 0.25,
            { top: 190, bottom: 70, left: 60, right: 100 }
        );
        if (level == 1) {
            this.setEnemyLevelStats(-50, 360, 460, 300);
        } else if (level == 2) {
            this.setEnemyLevelStats(-30, 300, 350, 350);
        } else if (level == 3) {
            this.setEnemyLevelStats(-30, 300, 350, 400);
        }
    }

    getDragonType(level) {
        this.setEnemyMetaStats(
            0.15 + Math.random() * 0.25,
            { top: 190, bottom: 150, left: 100, right: 100 }
        );
        if (level == 1) {
            this.setEnemyLevelStats(150, 260, 360, 300);
        } else if (level == 2) {
            this.setEnemyLevelStats(-30, 300, 350, 350);
        } else if (level == 3) {
            this.setEnemyLevelStats(-30, 300, 350, 400);
        }
    }


    getOrkType(level) {
        this.setEnemyMetaStats(
            this.enemySpeed = 0.45 + Math.random() * 0.55,
            this.offset = { top: 120, bottom: 30, left: 55, right: 70 }
        );
        if (level == 1) {
            this.setEnemyLevelStats(0, 200, 250, 100);
        } else if (level == 2) {
            this.setEnemyLevelStats(0, 200, 250, 150);
        } else if (level == 3) {
            this.setEnemyLevelStats(0, 200, 250, 200);
        }
    }

    setEnemyMetaStats(speed, offset) {
        this.enemySpeed = speed;
        this.offset = offset;
    }

    setEnemyLevelStats(yOffset, width, height, energy) {
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
                    this.playAnimation(this.imagesHurt);
            }
        }, 100);
    }
}