class CollidingObject {
    hitByFireBall = false;
    checkCollisions() {
        // character with enemy
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                if (this.world.character.attackingFromAbove && enemy.name === "ork") {
                    this.jumpKill(enemy);
                }
                else if (!this.world.character.ignoreDamage && !enemy.currentlyDying){
                if (enemy.name === "dragonBoss") {
                    this.world.character.hit(100);
                } else {
                    this.world.character.hit(10);
                }
                this.world.statusBar.setPercentage(this.world.character.energy);
                console.log(this.world.character.energy);
                }
            }
        });
        // character with missiles
        this.world.missileObjects.forEach((missile) => {
            if (this.world.character.isColliding(missile) && !this.hitByFireBall && !this.world.character.ignoreDamage) {
                this.hitByFireBall = true;
                this.world.character.hit(50);
                this.world.statusBar.setPercentage(this.world.character.energy);
                    setTimeout(() => {
                        this.hitByFireBall = false;
                    }, 2000);
                }
            if (missile.isOnGround()) {
                this.world.missileObjects.splice(this.world.missileObjects.indexOf(missile), 1);
            }
        });
        // character with collectables
        this.world.collectables.forEach((collectable) => {
            if (this.world.character.isColliding(collectable)) {
                // get 50 health
                if (collectable.name === "drinkhorn") {
                    this.world.character.energy = Math.min(this.world.character.energy + 50, 100);
                    this.world.statusBar.setPercentage(this.world.character.energy);
                }
                // god mode 5s
                else if (collectable.name === "thorshammer") {
                    this.world.character.ignoreDamage = true;
                    this.world.character.energy = 100;
                    this.world.statusBar.setPercentage(this.world.character.energy);
                    setTimeout(() => {
                        this.world.character.ignoreDamage = false;
                    }, 5000);
                } else {
                    console.log(collectable.name + " picked up");
                    this.world.throwableAmount = Math.min(this.world.throwableAmount + 5, 10);
                    this.world.weaponBar.setWeaponAmount(this.world.throwableAmount);
                }

                
                this.world.level.collectables.splice(this.world.level.collectables.indexOf(collectable), 1);
            }
        });
        // character with boss
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
                if (this.world.character.isApproaching(enemy, 120) &&
                    (enemy.name != "dragon" ||
                    enemy.name != "dragonBoss")) {
                    enemy.playAnimation(enemy.imagesAttacking);
                } else {
                    enemy.playAnimation(enemy.imagesWalking);
                }
    
                //Flying Enemies && FIREBALL ANIMATION
                if (enemy.name === "dragon" &&
                    this.world.character.isApproaching(enemy, 250) ||
                    enemy.name === "dragonBoss" && 
                    this.world.character.isApproaching(enemy, 250)) {

                    if (enemy.attackTriggered) return; 
    
                    enemy.attackTriggered = true;
                    enemy.isAttacking = true;
                    sounds.dragon.attack.play();

                    let fireBall = this.createFlame(enemy);
                    if (enemy.name === "dragonBoss") {
                        fireBall.speedX = fireBall.speedX/10 + 5 * -1; // set direction
                    } else {
                        fireBall.speedY = -5; // set gravity and speed Y
                        fireBall.speedX = fireBall.speedX/10 + 5 * -1; // set direction and speed X
                    }

                    this.world.missileObjects.push(fireBall); // adds object to world / canvas

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
    

    throwObject() {
        let currentTime = Date.now();
        let cooldown = currentTime - this.world.lastThrowTime;
        let offsetX = this.world.character.width / 2; // x centered to character
        let offsetY = this.world.character.height / 3; // y slightly above character
        let direction = this.world.character.otherDirection ? -1 : 1; // throw left if walking left
        

        if (this.world.keyboard.clickedD && cooldown >= 500) { // cooldown on throw by 0.5s
            sounds.character.attack.play();
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
        console.log(object.attackDragon);
        
        if (object.name === "dragonBoss") {
            return new ThrowableObject(
                object.x + object.offset.right * 1,
                object.currentPositionY + object.offset.top + 70,
                object.attackDragon, // its a fireball
                object.otherDirection
            );
        }
        if (object.name === "dragon") {
            return new ThrowableObject(
                object.x + 20 * 1,
                object.y + object.offset.top - 20,
                object.attackDragon, // its a fireball
                object.otherDirection
            );
        }
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
                if (inAir && throwableObject.isColliding(enemy) && !enemy.isDead()) {
                    enemy.hit(20);
                    console.log(enemy.name + "hit by" + throwableObject.name);
                    
                    if (enemy.name === "dragonBoss") {
                        this.world.statusBarBoss.setPercentage(enemy.energy);
                        console.log(enemy.energy);
                    }
                    thrownObjects.splice(thrownObjects.indexOf(throwableObject), 1);
                    if (enemy.isDead()) {
                        if (enemy.name === "troll") {
                            this.world.spawnCollectableOnEnemyDeath(enemy);
                        }
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
