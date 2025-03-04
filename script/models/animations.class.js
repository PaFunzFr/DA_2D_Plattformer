/**
 * Class responsible for handling various animation effects in the game.
 */
class Animation {

    /**
     * Animates the death of a target and plays the corresponding sound.
     * @param {Object} target - The target object to animate the death of.
     */
    animateDeath(target) {
        playSound(target.name, 'death')
        target.currentlyDying = true;
        let index = 0;
        if (!target.killed) { 
            let interval = setInterval(() => {
                target.img.src = target.imagesDead[index].src;
                index++;
                if (index >= target.imagesDead.length) clearInterval(interval);
            }, 1000 / 30);
        }
        target.killed = true;
    }

    /**
     * Animates the death sequence of the player's character.
     */
    characterDeath() {
        let frame = 0;
        this.world.character.currentImage = 0;
        let animationInterval = setInterval(() => {
            this.world.character.playAnimation(this.world.character.imagesDead);
            frame++;
            if (frame >= this.world.character.imagesDead.length) {
                clearInterval(animationInterval);
            }
        }, 100);
    }

    /**
     * Animates the death of a target and deletes it from the level after a delay.
     * @param {Object} target - The enemy target to animate the death and deletion of.
     */
    animateDeathAndDelete(target) {
        target.enemySpeed = 0;
        this.world.character.ignoreDamage = true;
        this.world.animations.animateDeath(target);
        setTimeout(() => {
            this.world.level.enemies = this.world.level.enemies.filter(e => e !== target);
            this.world.character.ignoreDamage = false;
        }, 1000);
    }
}

