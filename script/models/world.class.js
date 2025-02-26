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
    throwableAmount = 10;
    lastThrowTime = 0;
    gameOver = false;

    constructor(canvas, keyboard, level, levelNumber, character) {
        this.character = new Character(character);
        this.animations = new Animation();
        this.statusBar = new StatusBar(character, "1_health", 6, 10, null);
        this.weaponBar = new StatusBar(character, "2_weapons", 11, 50, this.throwableAmount);
        //this.statusBarBoss = new StatusBar("dragon" + levelNumber, "1_health", 300, 0, null);
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.setWorld();
        this.draw();
        this.runCollisionHandler();
    }

    runCollisionHandler() {
        this.collidingHandler.checkDistance();
        setInterval(() => {
            this.stopGame();
        }, 30);
        setInterval(() => {
            this.collidingHandler.checkCollisions();
        }, 200);
        setInterval(() => {
            this.collidingHandler.checkCollisionsThrowable();
            //this.collidingHandler.enemyDead();
        }, 30);
    }

    setWorld() {
        this.character.world = this; // add world instance (class) to character.world
        this.collidingHandler.world = this; // add a world instance to
        this.animations.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // refresh / clear canvas before
        this.ctx.translate(this.cameraX, 0);
        this.creatingBackground();
        this.addMovableObjects();
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.weaponBar);
        //this.addToMap(this.statusBarBoss);
        this.collidingHandler.throwObject(); 
        requestAnimationFrame(this.draw.bind(this)); // bind(this) instead of let self = this and self.draw()
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

    resumeIntervall() {
        this.draw();
    }

    stopGame() {
        if (this.character.energy === 0 && !this.gameOver) {
            playSound('character', 'death')
            this.gameOver = true;
            this.clearAllIntervals();
            this.animations.characterDeath();
        }
    }
    
} 