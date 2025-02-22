class CollidingObject {

    checkCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                if (this.world.character.attackingFromAbove && enemy.name != "troll") {
                    enemy.hit(100);
                    if (enemy.isDead()) {
                        this.world.level.enemies.splice(this.world.level.enemies.indexOf(enemy), 1);
                    }
                } else {
                this.world.character.hit(5);
                this.world.statusBar.setPercentage(this.world.character.energy);
                console.log(this.world.character.energy);
                }
            }
        });
    }

    checkDistance() {
        this.world.level.enemies.forEach((enemy) => {
                setInterval(() => {
                    if (this.world.character.isApproaching(enemy, 120)) {
                    enemy.playAnimation(enemy.imagesAttacking);
                } else {
                    enemy.playAnimation(enemy.imagesWalking);
                };
            }, 200);
        });
    }
    

    throwObject() {
        let currentTime = Date.now();
        let cooldown = currentTime - this.world.lastThrowTime;
        let offsetX = this.world.character.width / 2; // x centered to character
        let offsetY = this.world.character.height / 3; // y slightly above character
        let direction = this.world.character.otherDirection ? -1 : 1; // throw left if walking left

        if (this.world.keyboard.clickedD && cooldown >= 500) { // cooldown on throw by 0.5s
            this.triggerThrowingObject(offsetX, offsetY, direction, currentTime);

        }
    }

    triggerThrowingObject(offsetX, offsetY, direction, currentTime) {
        if (this.world.throwableAmount <= 0) {return};
        this.world.throwableAmount -= 1;
        this.world.lastThrowTime = currentTime; // set time of last throw
        console.log(this.world.throwableAmount + " Wurfwaffen übrig");
        let throwableObject = this.createThrowableObject(offsetX, offsetY, direction);
        throwableObject.speedX = throwableObject.speedX * direction; // set direction
        this.world.throwableObjects.push(throwableObject);
    }

    createThrowableObject(offsetX, offsetY, direction) {
        return new ThrowableObject(
            this.world.character.x + offsetX * direction,
            this.world.character.y - offsetY,
            "axe",
            this.world.character.otherDirection
        );
    }

    checkCollisionsThrowable() {
        let thrownObjects = this.world.throwableObjects;
        let enemies = this.world.level.enemies;
        thrownObjects.forEach((throwableObject) => {
            let inAir = false;
            if (this.world.character.isColliding(throwableObject)) {
                thrownObjects.splice(thrownObjects.indexOf(throwableObject), 1);
                console.log("waffe + 1");
                this.world.throwableAmount += 1;
            }
            if (throwableObject.y < 360) {
                inAir = true;
            }
            this.world.level.enemies.forEach((enemy) => {
                if (inAir && throwableObject.isColliding(enemy)) {
                    enemy.hit(100);
                    thrownObjects.splice(thrownObjects.indexOf(throwableObject), 1);
                    if (enemy.isDead()) {
                        enemies.splice(enemies.indexOf(enemy), 1);
                    }
                }
            });
        });
    }
}
