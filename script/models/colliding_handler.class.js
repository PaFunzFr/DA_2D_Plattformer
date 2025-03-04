/**
 * Class that handles the detection and response to collisions.
 */
class CollidingObject {
    hitByFireBall = false;
    attackTriggered = false;

    /**
     * Triggers collision checks for various game elements.
     * This includes checking for collisions with enemies, missiles, and collectables.
     */
    collisionTriggers() {
        this.collidingWithEnemy();
        this.collidingWithMissile();
        this.collidingWithCollectables();
    }

    /**
     * Handles distance-based triggers, such as interactions with enemies.
     * Iterates over all enemies and checks for specific behaviors based on proximity.
     */
    distanceTriggers() {
        this.world.level.enemies.forEach((enemy) => {
            if (enemy.currentlyDying) return;
            this.enemiesFollowing(enemy);
            this.enemiesAttacking(enemy);
            this.dragonAttacking(enemy);
        });
    }

    /**
     * Checks for collisions with throwable objects.
     * Updates the status of thrown objects and handles interactions with the player and enemies.
     */
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

    /**
     * Detects collisions with enemies and reacts accordingly.
     * If the player attacks from above and the enemy is an "ork", a jump kill is performed.
     * Otherwise, the player is damaged by the enemy unless specific conditions are met.
     */
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

    /**
     * Deals damage to the character based on the enemy hit.
     * The amount of damage is determined by the enemy type.
     * @param {Object} enemy - The enemy object the character collides with.
     */
    hitCharacter(enemy) {
        if (enemy.name === "dragonBoss") {
            this.world.character.hit(100);
        } else {this.world.character.hit(10)}
    }

    /**
     * Detects collisions with missile objects, which damages the character.
     * If the missile hits the ground, it is removed from the game.
     */
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

    /**
     * Detects collisions with collectables.
     * If the character collides with a collectable, it is picked up and a bonus is granted.
     */
    collidingWithCollectables() {
        this.world.collectables.forEach((collectable) => {
            if (this.world.character.isColliding(collectable)) {
                playSound("environment", "pickup");
                this.getBonusByCollectableType(collectable);
                this.world.level.collectables.splice(this.world.level.collectables.indexOf(collectable), 1);
        }});
    }

    /**
     * Grants a bonus based on the type of collectable object picked up.
     * @param {Object} collectable - The collectable object that the character interacts with.
     */
    getBonusByCollectableType(collectable) {
        if (collectable.name === "drinkhorn") {
            this.gainHealth();
        } else if (collectable.name === "thorshammer") {
            this.setGodMode();
        } else if (["axe", "club", "hammer"].includes(collectable.name)) {
            this.gainWeapons();
        };
    }

    /**
     * Increases the number of throwable weapons the character has but maximum 10.
     */
    gainWeapons() {
        this.world.throwableAmount = Math.min(this.world.throwableAmount + 5, 10);
        this.world.weaponBar.setWeaponAmount(this.world.throwableAmount);
    }

    /**
     * Restores health to the character. The health is capped at a maximum of 100.
     */
    gainHealth() {
        if (!this.world.character.ignoreDamage) {
            this.world.character.energy = Math.min(this.world.character.energy + 50, 100);
            this.world.statusBar.setPercentage(this.world.character.energy);
        }
    }
    

    /**
     * Activates god mode for the character for 5 seconds.
     */
    setGodMode() {
        this.world.character.ignoreDamage = true;
        this.world.character.energy = 100;
        this.world.statusBar.loadImage(`./img/06_statusbars/1_statusbar/1_health/${this.world.character.character}/B6.png`);
        setTimeout(() => {
            this.resetGodmode();
        }, 5000);
    }

    /**
     * Resets the character's god mode, making them vulnerable again. Restores the health bar initial img.
     * 
     */
    resetGodmode() {
        this.world.character.energy = 100;
        this.world.statusBar.setPercentage(this.world.character.energy);
        this.world.character.ignoreDamage = false;
    }

    /**
     * Performs a jump kill on an enemy by dealing a large amount of damage. Deletes enemy after kill.
     * @param {Object} enemy - The enemy object that is being attacked.
     */
    jumpKill(enemy) {
        enemy.hit(100);
        this.deleteIfDead(enemy);
    }

    /**
     * Deletes the enemy if they are dead. If a troll is dead, a horn is dropped.
     * @param {Object} enemy - The enemy object to be checked and deleted.
     */
    deleteIfDead(enemy) {
        if (enemy.isDead()) {
            this.trollDropsHorn(enemy);
            this.world.animations.animateDeathAndDelete(enemy);
        }
    }

    /**
     * Determines if an enemy is following the character.
     * @param {Object} enemy - The enemy object being checked.
     */
    enemiesFollowing(enemy) {
        if(this.world.character.x > enemy.x && !enemy.currentlyDying && enemy.name != "dragon") {
            enemy.passedCharacter = true;
        } else {
            enemy.passedCharacter = false;
        }
    };

    /**
     * Handles the attack behavior of enemies based on their distance from the character.
     * @param {Object} enemy - The enemy object that is being checked.
     */
    enemiesAttacking(enemy) {
        if (this.world.character.isApproaching(enemy, 120) && (enemy.name != "dragon" || enemy.name != "dragonBoss")) {
            enemy.playAnimation(enemy.imagesAttack);
        } else {
            enemy.playAnimation(enemy.imagesWalking);
        }
    }

    /**
     * Triggers the dragon or dragon boss attack when the character is within a certain range.
     * @param {Object} enemy - The enemy object that is being checked for attack behavior.
     */
    dragonAttacking(enemy) {
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

    /**
     * Sets the attack status of the enemy, indicating that an attack has been triggered and the enemy is in an attacking state.
     * @param {Object} enemy - The enemy object whose attack status is being set.
     */
    setAttackStatus(enemy) {
        enemy.attackTriggered = true;
        enemy.isAttacking = true;
    }

    /**
     * Resets the attack status of the enemy after a short delay, indicating the end of the attack animation.
     * @param {Object} enemy - The enemy object whose attack status is being reset.
     */
    resetAttackStatus(enemy) {
        setTimeout(() => {
            enemy.isAttacking = false;
        }, 1000);
        setTimeout(() => {
            enemy.attackTriggered = false; 
        }, 3000);
    }

    /**
     * Adjusts the direction and speed of the fireball based on the type of dragon.
     * @param {Object} enemy - The enemy object, either "dragon" or "dragonBoss".
     * @param {Object} fireBall - The fireball object that is being adjusted.
     */
    attackByDragonType(enemy, fireBall) {
        if (enemy.name === "dragonBoss") {
            fireBall.speedX = fireBall.speedX/10 + 5 * -1; // set direction
        } else {
            fireBall.speedY = -5; // set gravity and speed Y
            fireBall.speedX = fireBall.speedX/10 + 5 * -1; // set direction and speed X
        }
    }

    /**
     * Throws an object when the player presses the corresponding key, ensuring a cooldown period between throws.
     */
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

    /**
     * Triggers the action of throwing an object, reducing the throwable amount and updating the weapon bar.
     * @param {number} offsetX - The offset on the X-axis for positioning the thrown object.
     * @param {number} offsetY - The offset on the Y-axis for positioning the thrown object.
     * @param {number} direction - The direction in which the object will be thrown.
     * @param {number} currentTime - The current timestamp for managing the throw cooldown.
     */
    triggerThrowingObject(offsetX, offsetY, direction, currentTime) {
        if (this.world.throwableAmount <= 0) {return};
        this.world.throwableAmount -= 1;
        this.world.weaponBar.setWeaponAmount(this.world.throwableAmount);
        this.world.lastThrowTime = currentTime; // set time of last throw
        let throwableObject = this.createThrowableObject(offsetX, offsetY, direction);
        throwableObject.speedX = throwableObject.speedX * direction; // set direction
        this.world.throwableObjects.push(throwableObject);
    }

    /**
     * Creates a new throwable object based on the character's current position and direction.
     * @param {number} offsetX - The offset on the X-axis for positioning the throwable object.
     * @param {number} offsetY - The offset on the Y-axis for positioning the throwable object.
     * @param {number} direction - The direction in which the throwable object will be launched.
     * @returns {ThrowableObject} The newly created throwable object.
     */
    createThrowableObject(offsetX, offsetY, direction) {
        return new ThrowableObject(
            this.world.character.x + offsetX * direction,
            this.world.character.y - offsetY,
            this.world.character.character,
            this.world.character.otherDirection
        );
    }

    /**
     * Creates a flame object for a dragon or dragon boss based on the enemy type.
     * @param {Object} object - The enemy object, either "dragon" or "dragonBoss".
     * @returns {ThrowableObject} A newly created flame object (fireball).
     */
    createFlame(object) {
        if (object.name === "dragonBoss") {
            return this.dragonBossFire(object);
        }
        if (object.name === "dragon") {
            return this.dragonFire(object);
        }
    }

    /**
     * Creates a fireball for the dragon boss.
     * @param {Object} object - The dragon boss object from which the fireball is created.
     * @returns {ThrowableObject} A newly created fireball object for the dragon boss.
     */
    dragonBossFire(object) {
        return new ThrowableObject(
            object.x + object.offset.right * 1,
            object.currentPositionY + object.offset.top + 70,
            object.attackDragon,
            object.otherDirection
        );
    }

    /**
     * Creates a fireball for the dragon.
     * @param {Object} object - The dragon object from which the fireball is created.
     * @returns {ThrowableObject} A newly created fireball object for the dragon.
     */
    dragonFire(object) {
        return new ThrowableObject(
            object.x + 20 * 1,
            object.y + object.offset.top - 20,
            object.attackDragon,
            object.otherDirection
        );
    }

    /**
     * Collects a throwable object and updates the weapon amount in the world.
     * @param {ThrowableObject} throwableObject - The object to be collected.
     * @param {Array} thrownObjects - The array of thrown objects.
     */
    collectThrowable(throwableObject, thrownObjects) {
        thrownObjects.splice(thrownObjects.indexOf(throwableObject), 1);
        this.world.throwableAmount += 1;
        this.world.weaponBar.setWeaponAmount(this.world.throwableAmount);
    }

    /**
     * Checks if the throwable object is still in the air.
     * @param {ThrowableObject} throwableObject - The object to check.
     * @returns {boolean} - True if the object is still in the air.
     */
    setStatusInAir(throwableObject) {
        return throwableObject.y < 360;
    }
    

    /**
     * Detects collisions between a throwable object and enemies, and applies damage.
     * @param {ThrowableObject} throwableObject - The object to check for collisions.
     * @param {boolean} inAir - Whether the object is in the air.
     * @param {Array} thrownObjects - The array of thrown objects.
     */
    hitEnemyWithThrowable(throwableObject, inAir, thrownObjects) {
        this.world.level.enemies.forEach((enemy) => {
            if (inAir && throwableObject.isColliding(enemy) && !enemy.isDead()) {
                enemy.hit(20);
                if (enemy.name === "dragonBoss") {
                    this.world.statusBarBoss.setPercentage(enemy.energy);
                }
                thrownObjects.splice(thrownObjects.indexOf(throwableObject), 1);
                this.deleteIfDead(enemy);
            }
        });
    }

    /**
     * Spawns a collectable item when a troll enemy is defeated.
     * @param {Enemy} enemy - The defeated enemy.
     */
    trollDropsHorn(enemy) {
        if (enemy.name === "troll") {
            this.world.spawnCollectableOnEnemyDeath(enemy);
        }
    }
}
