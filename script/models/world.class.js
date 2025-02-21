class World {
    character = new Character();
    canvas;
    ctx;
    keyboard;
    cameraX = -100;
    statusBar = new StatusBar();
    throwableObjects = [];
    throwableAmount = 10;
    lastThrowTime = 0;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.setWorld();
        this.draw();
        this.run();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 200);
        setInterval(() => {
           // this.checkThrowObjects();
        }, 1000);
        setInterval(() => {
            this.checkCollisionsThrowable();
        }, 20);
    }

    checkThrowObjects() {
        let currentTime = Date.now();
        let cooldown = currentTime - this.lastThrowTime;
        if (this.keyboard.clickedD && cooldown >= 500) { // cooldown on throw by 0.5s
            if (this.throwableAmount <= 0) {
                return;
            }
            this.throwableAmount -= 1;
            this.lastThrowTime = currentTime; // set time of last throw
            console.log(this.throwableAmount + " Wurfwaffen übrig");

            let offsetX = this.character.width / 2; // x centered to character
            let offsetY = this.character.height / 3; // y slightly above character
            let direction = this.character.otherDirection ? -1 : 1; // throw left if walking left

            let throwableObject = new ThrowableObject(
                this.character.x + offsetX * direction,
                this.character.y - offsetY,
                "axe",
                this.character.otherDirection
            );
            throwableObject.speedX = throwableObject.speedX * direction; // set direction
            this.throwableObjects.push(throwableObject);
        }
    }

    checkCollisions() {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit(5);
                    this.statusBar.setPercentage(this.character.energy);
                    console.log(this.character.energy);
                }
            });
    }
    
    checkCollisionsThrowable() {
        this.throwableObjects.forEach((throwableObject) => {
            let inAir = false;
            if (this.character.isColliding(throwableObject)) {
                this.throwableObjects.splice(this.throwableObjects.indexOf(throwableObject), 1);
                console.log("waffe + 1");
                this.throwableAmount += 1;
            }
            if (throwableObject.y < 360) {
                inAir = true;
            }
            this.level.enemies.forEach((enemy) => {
                if (inAir && throwableObject.isColliding(enemy)) {
                    enemy.hit(100);
                    this.throwableObjects.splice(this.throwableObjects.indexOf(throwableObject), 1);
                    if (enemy.isDead()) {
                        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                    }
                }
            });
        });
    }
    

    setWorld() {
        this.character.world = this; // add world instance (class) to character.world
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // refresh / clear canvas before

        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);


        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusBar);
        this.checkThrowObjects(); 
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