/**
 * Represents an enemy in the game.
 * 
 * The `Enemy` class extends from `MovableObject` and handles various behaviors specific to enemies,
 * such as movement, animations, and state based on different types of enemies (e.g., Ork, Troll, Dragon).
 */
class Enemy extends MovableObject {
    width = 0;
    height = 0;
    enemySpeed = 0;
    passedCharacter = false;
    name;

    /**
     * Creates an instance of the Enemy.
     * @param {string} name - The name/type of the enemy (e.g., "ork", "troll", "dragon").
     * @param {number} level - The level of the enemy (1, 2, or 3).
     * @param {number} positionX - The initial X position of the enemy.
     */
    constructor(name, level, positionX) {
        super();
        this.x = positionX;
        this.name = name;
        this.attackDragon = "fireball";
        this.getCharacterStat(name, level);
        this.y = 480 - this.height - this.yOffset;
        this.loadAllImages(level, name);
        this.startMovementAfterDelay();
    }


    /**
     * Loads all images for the specified character, including idle, walking, jumping, hurt, dead, and attack animations.
     * @param {number} level - The level number for which the enemy images are loaded.
     * @param {string} name - The name of the enemy.
     */
    loadAllImages(level, name) {
        this.loadImage(`./img/02_enemies/${name}/${name}${level}/6_attack/ATTACK_000.png`)
        this.preloadImages(this.imagesWalking, `./img/02_enemies/${name}/${name}${level}/2_walk/WALK_00`, 10);
        this.preloadImages(this.imagesAttack, `./img/02_enemies/${name}/${name}${level}/6_attack/ATTACK_00`, 10);
        this.preloadImages(this.imagesDead, `./img/02_enemies/${name}/${name}${level}/5_dead/DIE_00`, 10);
        this.preloadImages(this.imagesHurt, `./img/02_enemies/${name}/${name}${level}/4_hurt/HURT_00`, 3);
    }

    /**
     * Starts the enemy's movement with a delay.
     * @private
     */
    startMovementAfterDelay() {
        setTimeout(() => {
            this.animate();  
        }, 5000);  
    }

    /**
     * Gets the character stats based on the enemy type and level.
     * @param {string} name - The name/type of the enemy (e.g., "ork", "troll", "dragon").
     * @param {number} level - The level of the enemy (1, 2, or 3).
     * @private
     */
    getCharacterStat(name, level) {
        if (name == "ork") {
            this.getOrkType(level);
        } else if (name == "troll") {
            this.getTrollType(level);
        } else if (name == "dragon") {
            this.getDragonType(level);
        }
    }

    /**
     * Sets stats for the Troll type enemy.
     * @param {number} level - The level of the enemy (1, 2, or 3).
     * @private
     */
    getTrollType(level) {
        this.setEnemyMetaStats(
            0.15 + Math.random() * 0.25,
            { top: 190, bottom: 70, left: 60, right: 100 }
        );
        if (level == 1) {
            this.setEnemyLevelStats(-50, 360, 460, 40);
        } else if (level == 2) {
            this.setEnemyLevelStats(-30, 300, 350, 50);
        } else if (level == 3) {
            this.setEnemyLevelStats(-30, 300, 350, 70);
        }
    }

    /**
     * Sets stats for the Dragon type enemy.
     * @param {number} level - The level of the enemy (1, 2, or 3).
     * @private
     */
    getDragonType(level) {
        this.setEnemyMetaStats(
            1.5 + Math.random() * 0.25,
            { top: 190, bottom: 150, left: 100, right: 100 }
        );
        if (level == 1) {
            this.setEnemyLevelStats((160 + Math.random() * 80), 260, 360, 20);
        } else if (level == 2) {
            this.setEnemyLevelStats((130 + Math.random() * 80), 260, 360, 20);
        } else if (level == 3) {
            this.setEnemyLevelStats((90 + Math.random() * 70), 260, 360, 20);
        }
    }

    /**
     * Sets stats for the Ork type enemy.
     * @param {number} level - The level of the enemy (1, 2, or 3).
     * @private
     */
    getOrkType(level) {
        this.setEnemyMetaStats(
            0.45 + Math.random() * 0.55,
            { top: 120, bottom: 30, left: 55, right: 70 }
        );
        if (level == 1) {
            this.setEnemyLevelStats(0, 200, 250, 20);
        } else if (level == 2) {
            this.setEnemyLevelStats(0, 200, 250, 20);
        } else if (level == 3) {
            this.setEnemyLevelStats(0, 200, 250, 20);
        }
    }

    /**
     * Sets the metadata stats for the enemy, such as speed and offsets.
     * @param {number} speed - The speed of the enemy.
     * @param {object} offset - The offsets for the enemy's hitbox.
     * @private
     */
    setEnemyMetaStats(speed, offset) {
        this.enemySpeed = speed;
        this.offset = offset;
    }

    /**
     * Sets the level-specific stats for the enemy, such as size and energy.
     * @param {number} yOffset - The vertical offset of the enemy.
     * @param {number} width - The width of the enemy.
     * @param {number} height - The height of the enemy.
     * @param {number} energy - The energy of the enemy.
     * @private
     */
    setEnemyLevelStats(yOffset, width, height, energy) {
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;
        this.energy = energy;
    }

    /**
     * Manages the animation and movement behavior of the enemy.
     * This method runs at intervals to update the movement and animation frames for the enemy.
     * It controls the movement direction and plays the hurt animation when the enemy is hurt.
     * @private
     */
    animate() {
        setInterval(() => {
            this.setMovement();
        }, 1000 / 60);
        setInterval(() => {
            this.setFrames();
        }, 100);
    }

    /**
     * Updates the animation frames of the enemy based on its current state.
     * If the enemy is hurt and not currently dying, the hurt animation is played.
     */
    setFrames() {
        if (this.isHurt() && !this.currentlyDying) {
            this.playAnimation(this.imagesHurt);
        }
    }

    /**
     * Controls the movement of the enemy based on its current state.
     * The enemy moves left until it passes the character, and then moves right.
     */
    setMovement() {
        if (!this.currentlyDying && !this.passedCharacter) {
            this.moveLeft(this.enemySpeed);
        } else if (!this.currentlyDying && this.passedCharacter) {
            this.moveRight(this.enemySpeed)
        }
    }
}