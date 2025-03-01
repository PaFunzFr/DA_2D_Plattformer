class Collectable extends DrawableObject {
    width = 80;
    height = 80;
    currentImage = 0;
    imagesCache = [];
    name;

    constructor(name, positionX) {
        super();
        this.x = positionX;
        this.name = name;
        this.collectibleOffsetY(name);
        this.loadImage(`./img/07_collectables/${name}/0.png`)
        this.preloadImages(this.imagesCache, `./img/07_collectables/${name}/`, 2);
        this.animate();
    }

    collectibleOffsetY(name) { 
        if (name === "thorshammer") {
            this.y = 480 - this.height - 140;
        } else  {
            this.y = 480 - this.height - 30;
        }
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesCache);
        }, 140);
    }
}