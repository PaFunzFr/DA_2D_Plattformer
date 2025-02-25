class CollidingObject {
    hitByFireBall = false;
    checkCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                if (this.world.character.attackingFromAbove && enemy.name === "ork") {
                    this.jumpKill(enemy);
                }
                else if (!this.world.character.ignoreDamage && !enemy.currentlyDying){
                this.world.character.hit(5);
                this.world.statusBar.setPercentage(this.world.character.energy);
                console.log(this.world.character.energy);
                }
            }
        });
        this.world.missileObjects.forEach((missile) => {
            if (this.world.character.isColliding(missile) && !this.hitByFireBall) {
                this.hitByFireBall = true;
                this.world.character.hit(50);
                this.world.statusBar.setPercentage(this.world.character.energy);
                console.log(this.world.character.energy);
                setTimeout(() => {
                    this.hitByFireBall = false;
                }, 2000);
                }
            if (missile.isOnGround()) {
                this.world.missileObjects.splice(this.world.missileObjects.indexOf(missile), 1);
            }
        });
    }


    jumpKill(enemy) {
        enemy.hit(100);
        if (enemy.isDead()) {
                enemy.enemySpeed = 0;
                this.world.character.ignoreDamage = true;
                this.world.animations.animateDeath(enemy);
                setTimeout(() => {
                    this.world.level.enemies = this.world.level.enemies.filter(e => e !== enemy);
                    this.world.character.ignoreDamage = false;
                }, 1000);
        }
    } 

    attackTriggered = false;
    checkDistance() {
        setInterval(() => {
            this.world.level.enemies.forEach((enemy) => {
                if (enemy.currentlyDying) return;
    
                // common enemies
                if (this.world.character.isApproaching(enemy, 120) && enemy.name != "dragon") {
                    enemy.playAnimation(enemy.imagesAttacking);
                } else {
                    enemy.playAnimation(enemy.imagesWalking);
                }
    
                //endboss && FIREBALL ANIMATION
                if (enemy.name === "dragon" && this.world.character.isApproaching(enemy, 230)) {
                    if (enemy.attackTriggered) return; 
    
                    console.log("dragon triggered");
                    enemy.attackTriggered = true;
                    enemy.isAttacking = true;
                    let fireBall = this.createFlame(enemy);
                    fireBall.speedX = fireBall.speedX/10 + 5 * -1; // set direction
                    this.world.missileObjects.push(fireBall); // adds object to world / canvas
                    console.log("Feuerball trifft Feind:", fireBall.x, fireBall.y);

                    setTimeout(() => {

                        enemy.isAttacking = false;
                    }, 1000);
                    setTimeout(() => {
                        enemy.attackTriggered = false; 
                    }, 3000); // attacking each 3000ms
                }

            });
        }, 200);
    }
    
    
    endbossAttack() {

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
        this.world.weaponBar.setWeaponAmount(this.world.throwableAmount);
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
            this.world.character.character,
            this.world.character.otherDirection
        );
    }

    createFlame(object) {
        let offsetX = object.width / 2;
        let offsetY = object.height / 3;
        let direction = object.otherDirection ? -1 : 1;
        console.log(object.attack);
        
        return new ThrowableObject(
            object.x + object.offset.right * 1,
            object.currentPositionY + object.offset.top + 70,
            object.attack, // its a fireball
            object.otherDirection
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
                this.world.weaponBar.setWeaponAmount(this.world.throwableAmount);
            }
            if (throwableObject.y < 360) {
                inAir = true;
            }
            this.world.level.enemies.forEach((enemy) => {
                if (inAir && throwableObject.isColliding(enemy)) {
                    enemy.hit(200);
                    console.log(enemy.name + "hit by" + throwableObject.name)
                    thrownObjects.splice(thrownObjects.indexOf(throwableObject), 1);
                    if (enemy.isDead()) {
                        this.world.animations.animateDeath(enemy);
                        setTimeout(() => {
                            this.world.level.enemies = this.world.level.enemies.filter(e => e !== enemy);
                        }, 1000);
                    }
                }
            });
        });
    }
}
