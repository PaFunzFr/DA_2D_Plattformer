class Animation {

    playAnimation(obj, array) {
        let index = obj.currentImage % array.length;
        obj.img = array[index];
        obj.currentImage ++
    }

    animateDeath(target) {
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
}