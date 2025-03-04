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
        }, 2500);
    }

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

    setWorld() {
        this.character.world = this; // add world instance (class) to character.world
        this.collidingHandler.world = this; // add a world instance to
        this.animations.world = this;
    }

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

    addStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.weaponBar);
    }

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

    creatingBackground() {
        this.addObjectsToMap(this.level.air);
        this.addObjectsToMap(this.level.cloudsBackground);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    addMovableObjects() {
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.missileObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.collectables);
        this.addToMap(this.character);
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

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

    flipContent(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0); //move img origin
        this.ctx.scale(-1, 1); // flip img
        object.x = object.x * -1; // flip x position back to 0 = left
    }

    flipContentBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    spawnCollectableOnEnemyDeath(enemy) {
        if (enemy.name === "troll") {
            console.log("triggerCheck");
            let drinkHorn = new Collectable("drinkhorn", enemy.x + 100);
            this.collectables.push(drinkHorn);
        }
    }

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

    reloadAnimationCollectables() {
        this.level.collectables.forEach((collectable) => {
            collectable.animate();
        });
    }

    reloadAniamtionClouds() {
        this.level.clouds.forEach((cloud) => {
            cloud.animate();
        });
        this.level.cloudsBackground.forEach((cloud) => {
            cloud.animate();
        });
    }

    reloadAnimationsEnemies() {
        this.level.enemies.forEach((enemy) => {
            enemy.animate();
            setTimeout(() => {
                enemy.isAttacking = false;
                enemy.attackTriggered = false;
            }, 500);
        });
    }
    
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

    endIfBossDead() {
        if (this.endboss.energy === 0 && !this.gameOver) {
            this.statusBarBoss.img.src = `./img/06_statusbars/1_statusbar/1_health/dragon${this.levelNumber}/B6.png`;
            this.nextLevel();
            setTimeout(() => {
                this.renderBossDeadDialog();
            }, 1900);
        }
    }

    renderBossDeadDialog() {
        if (this.endboss.level != "3") {
            renderNextStageDialog();
        } else {
            renderWon();
        }
    }

    endGame() {
        playSound('character', 'death');
        muteAllSounds(true);
        this.gameOver = true;
        this.clearAllIntervals();
        this.animations.characterDeath();
    }
    
    nextLevel() {
        muteAllSounds(true);
        this.gameOver = true;
        setTimeout(() => {
            this.clearAllIntervals();
            playSound("other", "win");
        }, 2000);
    }
    
} 