class CollidingObject {
    hitByFireBall = false;
    attackTriggered = false;

    collisionTriggers() {
        this.collidingWithEnemy();
        this.collidingWithMissile();
        this.collidingWithCollectables();
    }

    distanceTriggers() {
        this.world.level.enemies.forEach((enemy) => {
            if (enemy.currentlyDying) return;
            this.EnemiesFollowing(enemy);
            this.EnemiesAttacking(enemy);
            this.DragonAttacking(enemy);
        });
    }

    collidingWithEnemy() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy)) {
                if (this.world.character.attackingFromAbove && enemy.name === "ork") {
                    this.jumpKill(enemy);
                } else if (!this.world.character.ignoreDamage && !enemy.currentlyDying) {
                    this.hitCharacter(enemy);
                    this.world.statusBar.setPercentage(this.world.character.energy);
                }
            }
        });
    }

    hitCharacter(enemy) {
        if (enemy.name === "dragonBoss") {
            this.world.character.hit(100);
        } else {this.world.character.hit(10)}
    }

    collidingWithMissile() {
        this.world.missileObjects.forEach((missile) => {
            if (this.world.character.isColliding(missile) && !this.hitByFireBall && !this.world.character.ignoreDamage) {
                this.hitByFireBall = true;
                this.world.character.hit(50);
                this.world.statusBar.setPercentage(this.world.character.energy);
                setTimeout(() => { this.hitByFireBall = false }, 2000);
                }
            if (missile.isOnGround()) {
                this.world.missileObjects.splice(this.world.missileObjects.indexOf(missile), 1);
            }
        });
    }

    collidingWithCollectables() {
        this.world.collectables.forEach((collectable) => {
            if (this.world.character.isColliding(collectable)) {
                playSound("environment", "pickup");
                this.getBonusByCollectableType(collectable);
                this.world.level.collectables.splice(this.world.level.collectables.indexOf(collectable), 1);
        }});
    }

    getBonusByCollectableType(collectable) {
        if (collectable.name === "drinkhorn" && !this.world.character.ignoreDamage) {
            this.gainHealth();
        } else if (collectable.name === "thorshammer") {
            this.setGodMode();
        } else {
            this.gainWeapons();
        };
    }

    gainWeapons() {
        this.world.throwableAmount = Math.min(this.world.throwableAmount + 5, 10);
        this.world.weaponBar.setWeaponAmount(this.world.throwableAmount);
    }

    gainHealth() {
        this.world.character.energy = Math.min(this.world.character.energy + 50, 100);
        this.world.statusBar.setPercentage(this.world.character.energy);
    }

    setGodMode() {
        this.world.character.ignoreDamage = true;
        this.world.character.energy = 100;
        this.world.statusBar.loadImage(`./img/06_statusbars/1_statusbar/1_health/${this.world.character.character}/B6.png`);
        setTimeout(() => {
            this.world.statusBar.loadImage(`./img/06_statusbars/1_statusbar/1_health/${this.world.character.character}/B5.png`);
            this.world.character.ignoreDamage = false;
        }, 5000);
    }

    jumpKill(enemy) {
        enemy.hit(100);
        if (enemy.isDead()) {
            this.world.animations.animateDeathAndDelete(enemy);
        }
    } 

    EnemiesFollowing(enemy) {
        if(this.world.character.x > (enemy.x + 50) && !enemy.currentlyDying && enemy.name != "dragon") {
            enemy.passedCharacter = true;
        } else {
            enemy.passedCharacter = false;
        }
    };

    EnemiesAttacking(enemy) {
        if (this.world.character.isApproaching(enemy, 120) && (enemy.name != "dragon" || enemy.name != "dragonBoss")) {
            enemy.playAnimation(enemy.imagesAttacking);
        } else {
            enemy.playAnimation(enemy.imagesWalking);
        }
    }

    DragonAttacking(enemy) {
        if (enemy.name === "dragon" && this.world.character.isApproaching(enemy, 250) ||
            enemy.name === "dragonBoss" && this.world.character.isApproaching(enemy, 250)) {
            if (enemy.attackTriggered) return;
            sounds.dragon.attack.play();
            this.setAttackStatus(enemy);
            let fireBall = this.createFlame(enemy);
            this.attackByDragonType(enemy, fireBall);
            this.world.missileObjects.push(fireBall); // adds object to world / canvas
            this.resetAttackStatus(enemy);
        }
    }

    setAttackStatus(enemy) {
        enemy.attackTriggered = true;
        enemy.isAttacking = true;
    }

    resetAttackStatus(enemy) {
        setTimeout(() => {
            enemy.isAttacking = false;
        }, 1000);
        setTimeout(() => {
            enemy.attackTriggered = false; 
        }, 3000);
    }

    attackByDragonType(enemy, fireBall) {
        if (enemy.name === "dragonBoss") {
            fireBall.speedX = fireBall.speedX/10 + 5 * -1; // set direction
        } else {
            fireBall.speedY = -5; // set gravity and speed Y
            fireBall.speedX = fireBall.speedX/10 + 5 * -1; // set direction and speed X
        }
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
        if (object.name === "dragonBoss") {
            return this.dragonBossFire(object);
        }
        if (object.name === "dragon") {
            return this.dragonFire(object);
        }
    }

    dragonBossFire(object) {
        return new ThrowableObject(
            object.x + object.offset.right * 1,
            object.currentPositionY + object.offset.top + 70,
            object.attackDragon,
            object.otherDirection
        );
    }

    dragonFire(object) {
        return new ThrowableObject(
            object.x + 20 * 1,
            object.y + object.offset.top - 20,
            object.attackDragon,
            object.otherDirection
        );
    }

    collectThrowable(throwableObject, thrownObjects) {
        thrownObjects.splice(thrownObjects.indexOf(throwableObject), 1);
        this.world.throwableAmount += 1;
        this.world.weaponBar.setWeaponAmount(this.world.throwableAmount);
    }

    setStatusInAir(throwableObject) {
        return throwableObject.y < 360;
    }
    

    hitEnemyWithThrowable(throwableObject, inAir, thrownObjects) {
        this.world.level.enemies.forEach((enemy) => {
            if (inAir && throwableObject.isColliding(enemy) && !enemy.isDead()) {
                enemy.hit(20);
                if (enemy.name === "dragonBoss") {
                    this.world.statusBarBoss.setPercentage(enemy.energy);
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
    }

    checkCollisionsThrowable() {
        let thrownObjects = this.world.throwableObjects;
        thrownObjects.forEach((throwableObject) => {
            let inAir = this.setStatusInAir(throwableObject);
            if (this.world.character.isColliding(throwableObject)) {
                this.collectThrowable(throwableObject, thrownObjects);
            }
            this.setStatusInAir(throwableObject, inAir);
            this.hitEnemyWithThrowable(throwableObject, inAir, thrownObjects);
        });
    }
}
