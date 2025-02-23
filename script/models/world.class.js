class World {
    character;
    collidingHandler = new CollidingObject();
    canvas;
    ctx;
    keyboard;
    cameraX = -100;
    statusBar = new StatusBar();
    throwableObjects = [];
    throwableAmount = 10;
    lastThrowTime = 0;
    gameOver = false;

    constructor(canvas, keyboard, level, character) {
        this.character = new Character(character);
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
        }, 200);
        setInterval(() => {
            this.collidingHandler.checkCollisions();
        }, 100);
        setInterval(() => {
            this.collidingHandler.checkCollisionsThrowable();
            //this.collidingHandler.enemyDead();
        }, 20);
    }

    setWorld() {
        this.character.world = this; // add world instance (class) to character.world
        this.collidingHandler.world = this; // add a world instance to 
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // refresh / clear canvas before
        this.ctx.translate(this.cameraX, 0);
        this.creatingBackground();
        this.addMovableObjects();
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusBar);
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
    stopGame() {
        if (this.character.energy === 0 && !this.gameOver) {
            console.log("YOU DIED!");
            this.gameOver = true;
            this.clearAllIntervals();
    
            let frame = 0;
            this.character.currentImage = 0;
            let animationInterval = setInterval(() => {
                this.character.playAnimation(this.character.imagesDead);
                frame++;
                if (frame >= this.character.imagesDead.length) {
                    clearInterval(animationInterval);
                }
            }, 100);
        }
    }
    
} 