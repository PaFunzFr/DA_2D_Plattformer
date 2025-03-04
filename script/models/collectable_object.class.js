/**
 * Class representing a collectible item in the game.
 */
class Collectable extends DrawableObject {
    width = 80;
    height = 80;
    currentImage = 0;
    imagesCache = [];
    name;

    /**
     * Creates a new collectible object.
     * @param {string} name - The name of the collectible item.
     * @param {number} positionX - The X position of the collectible on the canvas.
     */
    constructor(name, positionX) {
        super();
        this.x = positionX;
        this.name = name;
        this.collectibleOffsetY(name);
        this.loadImage(`./img/07_collectables/${name}/0.png`)
        this.preloadImages(this.imagesCache, `./img/07_collectables/${name}/`, 2);
        this.animate();
    }

    /**
     * Adjusts the Y offset for different types of collectibles.
     * @param {string} name - The name of the collectible item.
     */
    collectibleOffsetY(name) { 
        if (name === "thorshammer") {
            this.y = 480 - this.height - 140;
        } else  {
            this.y = 480 - this.height - 30;
        }
    }

    /**
     * Starts an animation loop to play the collectible's animation.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesCache);
        }, 140);
    }
}