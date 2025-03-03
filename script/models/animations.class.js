class Animation {

  /*  playAnimation(obj, array) {
        let index = obj.currentImage % array.length;
        obj.img = array[index];
        obj.currentImage ++
    }*/

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

    animateDragonBoss() {

    }

}

