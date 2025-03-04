/**
 * Represents the game world that manages the character, collision handling, animations, and more.
 */
class World {
    character;
    collidingHandler = new CollidingObject();
    animations;
    canvas;
    ctx;
    keyboard;
    cameraX = -100;
    statusBar;
    weaponBar;
    statusBarBoss;
    throwableObjects = [];
    missileObjects = [];
    collectables;
    throwableAmount = 10;
    lastThrowTime = 0;
    gameOver = false;
    bossTriggered = false;
    endboss;
    levelNumber;
    pause = false;

    /**
     * Creates an instance of the game world.
     * @param {HTMLCanvasElement} canvas The canvas element to draw on.
     * @param {Keyboard} keyboard The keyboard handler.
     * @param {Object} level The level data containing enemies and collectables.
     * @param {number} levelNumber The current level number.
     * @param {Character} character The character object.
     */
    constructor(canvas, keyboard, level, levelNumber, character) {
        this.character = new Character(character);
        this.animations = new Animation();
        this.statusBar = new StatusBar(character, "1_health", 6, 10, 10, null);
        this.weaponBar = new StatusBar(character, "2_weapons", 11, 10, 50, this.throwableAmount);
        this.statusBarBoss = new StatusBar("dragon" + levelNumber, "1_health", 6, 410, 10, null);
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.levelNumber = levelNumber;
        this.keyboard = keyboard;
        this.level = level;
        this.collectables = this.level.collectables;
        this.endboss = this.level.enemies[this.level.enemies.length -1];
        setTimeout(() => {
            this.createAnimatedWorld();
            mobileInterface.style.display = 'block';
            gameDialog.style.display = 'none';
            levelInfo.innerHTML = 'stage ' + levelNumber;
        }, 3000);
    }

    /**
     * Creates and animates the world, setting up initial elements and triggering world updates.
     */
    createAnimatedWorld() {
        this.setWorld();
        this.draw();
        this.runCollisionHandler();
        if (nextLevelTriggered) {
            this.reloadAnimationsEnemies();
            this.reloadAniamtionClouds()
            this.reloadAnimationCollectables();
        }
    }

    /**
     * Runs the collision handler at different intervals for checking and triggering collision events.
     */
    runCollisionHandler() {
        setInterval(() => {
            this.stopGame();
        }, 30);
        setInterval(() => {
            this.collidingHandler.collisionTriggers();
            this.collidingHandler.distanceTriggers();
        }, 200);
        setInterval(() => {
            this.collidingHandler.checkCollisionsThrowable();
        }, 30);
    }

    /**
     * Sets the world instance to the character, collision handler, and animations.
     */
    setWorld() {
        this.character.world = this; // add world instance (class) to character.world
        this.collidingHandler.world = this; // add a world instance to
        this.animations.world = this;
    }

    /**
     * Draws the game world, including background, movable objects, status bars, and handles game updates.
     * Uses `requestAnimationFrame` for efficient rendering.
     */
    draw() {
        if (this.paused) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // refresh / clear canvas before
        this.ctx.translate(this.cameraX, 0);
        this.creatingBackground();
        this.addMovableObjects();
        this.ctx.translate(-this.cameraX, 0);
        this.addStatusBars();
        this.bossTriggerEvent();
        this.collidingHandler.throwObject(); 
        requestAnimationFrame(this.draw.bind(this)); // bind(this) instead of let self = this and self.draw()
    } 

    /**
     * Adds the status bars (health and weapon bars) to the game world map.
     */
    addStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.weaponBar);
    }

    /**
     * Triggers the boss event when the character reaches a certain position.
     * The boss is spawned and its speed is adjusted based on the level number.
     */
    bossTriggerEvent() {
        if (this.character.x >= 3600) { // spawn if character reaches position x
            if (!this.bossTriggerd) {
                this.bossTriggerd = true;
                playSound("dragonBoss", "death");
                this.endboss.enemySpeed = 1 * this.levelNumber;
            }
        }
        if (this.bossTriggerd) {
            this.addToMap(this.statusBarBoss);
        }
    }

    /**
     * Creates and adds background objects (air, clouds, and other background elements) to the game world map.
     */
    creatingBackground() {
        this.addObjectsToMap(this.level.air);
        this.addObjectsToMap(this.level.cloudsBackground);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Adds movable objects (throwable objects, missile objects, enemies, and collectables) to the game world map.
     * Also includes adding the character to the map.
     */
    addMovableObjects() {
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.missileObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.collectables);
        this.addToMap(this.character);
    }

    /**
     * Adds an array of objects to the game world map.
     * @param {Array} objects The list of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Adds a single object to the game world map and draws it.
     * If the object is flipped (due to direction), the image is flipped accordingly.
     * @param {Object} object The object to be added to the map and drawn.
     */
    addToMap(object) {
        if (object.otherDirection) {
            this.flipContent(object);
        } 
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        if (object.otherDirection) {
            this.flipContentBack(object);
        }
        object.drawCollisionBody(this.ctx);
    }

    /**
     * Flips an object’s image horizontally to simulate the object facing the opposite direction.
     * @param {Object} object The object whose image should be flipped.
     */
    flipContent(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0); //move img origin
        this.ctx.scale(-1, 1); // flip img
        object.x = object.x * -1; // flip x position back to 0 = left
    }


    /**
     * Flips an object's position back horizontally (restores the original position after flipping).
     * @param {Object} object The object whose position is to be flipped back.
     */
    flipContentBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    /**
     * Clears all active intervals by their ID to stop ongoing processes or timers.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Spawns a collectable item upon the death of a specific enemy (troll).
     * @param {Object} enemy The enemy object that has died.
     */
    spawnCollectableOnEnemyDeath(enemy) {
        if (enemy.name === "troll") {
            console.log("triggerCheck");
            let drinkHorn = new Collectable("drinkhorn", enemy.x + 100);
            this.collectables.push(drinkHorn);
        }
    }

    /**
     * Pauses or unpauses the game depending on its current state.
     * Stops all sounds and intervals when paused.
     */
    pauseGame() {      
        this.paused = !this.paused;    
        if (this.paused && !this.gameOver) {
                muteAllSounds(true);
                this.clearAllIntervals();
        } else if (!this.gameOver){
            if (!mutedGlobal) {
                muteAllSounds(false);
            }
            this.reloadAnimations();
        }
    }

    /**
     * Reloads all necessary animations for various game objects.
     * This includes animations for the character, enemies, missiles, throwable objects, collectables, and clouds.
     */
    reloadAnimations() {
        this.runCollisionHandler();
        this.reloadAnimationsEnemies()
        this.missileObjects.forEach((missile) => { missile.animate(); });
        this.throwableObjects.forEach((object) => { object.animate(); });
        this.character.animate();
        this.character.applyGravity();
        this.reloadAnimationCollectables();
        this.reloadAniamtionClouds();
        this.draw(); 
    }

    /**
     * Reloads the animations for all collectable items in the current level.
     */
    reloadAnimationCollectables() {
        this.level.collectables.forEach((collectable) => {
            collectable.animate();
        });
    }

    /**
     * Reloads the animations for all clouds in the game (both foreground and background clouds).
     */
    reloadAniamtionClouds() {
        this.level.clouds.forEach((cloud) => {
            cloud.animate();
        });
        this.level.cloudsBackground.forEach((cloud) => {
            cloud.animate();
        });
    }

    /**
     * Reloads the animations for all enemies in the game.
     * Also resets enemy attack states after a short delay.
     */
    reloadAnimationsEnemies() {
        this.level.enemies.forEach((enemy) => {
            enemy.animate();
            setTimeout(() => {
                enemy.isAttacking = false;
                enemy.attackTriggered = false;
            }, 500);
        });
    }
    
    /**
     * Stops the game by checking if the character or boss is dead.
     */
    stopGame() {
        this.endIfCharacterDead();
        this.endIfBossDead();
    }

    endIfCharacterDead() {
        if (this.character.energy === 0 && !this.gameOver) {
            console.log("game over");
            this.endGame();
            setTimeout(() => {
                renderGameOver();
            }, 1900);
        }
    }

    /**
     * Ends the game if the character's energy reaches zero.
     * Triggers the game over state and renders the game over screen after a short delay.
     */
    endIfBossDead() {
        if (this.endboss.energy === 0 && !this.gameOver) {
            this.statusBarBoss.img.src = `./img/06_statusbars/1_statusbar/1_health/dragon${this.levelNumber}/B6.png`;
            this.nextLevel();
            setTimeout(() => {
                this.renderBossDeadDialog();
            }, 1900);
        }
    }

    /**
     * Ends the game if the boss's energy reaches zero.
     * Changes the boss's status bar and triggers the next level, followed by a dialog display.
     */
    renderBossDeadDialog() {
        if (this.endboss.level != "3") {
            renderNextStageDialog();
        } else {
            renderWon();
        }
    }

    /**
     * Ends the game by triggering the character's death sound, muting all sounds,
     * setting the game over state, clearing all intervals, and playing the character death animation.
     */
    endGame() {
        playSound('character', 'death');
        muteAllSounds(true);
        this.gameOver = true;
        this.clearAllIntervals();
        this.animations.characterDeath();
    }
    
    /**
     * Progresses the game to the next level by muting all sounds, setting the game over state,
     * clearing all intervals, and playing a win sound after a delay.
     */
    nextLevel() {
        muteAllSounds(true);
        this.gameOver = true;
        setTimeout(() => {
            this.clearAllIntervals();
            playSound("other", "win");
        }, 2000);
    }
    
} 