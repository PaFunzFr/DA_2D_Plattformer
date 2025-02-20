class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = -100;
    statusBar = new StatusBar();
    throwableObjects = [
        new ThrowableObject(),
    ];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checkCollisions();
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    console.log(this.character.energy);
                }
            })
        }, 200);
    }

    setWorld() {
        this.character.world = this; // add world instance (class) to character.world
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // refresh / clear canvas before

        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);

        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusBar);
        requestAnimationFrame(this.draw.bind(this)); // bind(this) instead of let self = this and self.draw()
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
} 