
/**
 * Represents a drawable object in the game with properties for image, position, size, and offsets.
 * Includes methods for loading and drawing images, preloading a series of images, and drawing a collision body.
 */
class DrawableObject {
    img;
    width;
    height;
    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    };
    x;
    y;
    currentImage = 0;
    otherDirection = false;

    /**
     * Loads an image from a given path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads a series of images into an array.
     * @param {HTMLImageElement[]} array - The array to store the preloaded images.
     * @param {string} path - The base path to the images.
     * @param {number} imageCount - The number of images to preload.
     */
    preloadImages(array, path, imageCount) {
        for (let index = 0; index < imageCount; index++) {
            let img = new Image();
            img.src = `${path}${index}.png`;
            array.push(img);        
        }
    }
    
    /**
     * Draws the collision body of the object on the given canvas context.
     * This method draws a transparent rectangle around the object based on its position and size.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    drawCollisionBody(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Collectable) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "transparent";
            ctx.rect(
                this.x + this.offset.left, 
                this.y + this.offset.top, 
                this.width - this.offset.left - this.offset.right, 
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }

    /**
     * Plays an animation by cycling through an array of images.
     * The current image is updated based on the `currentImage` index.
     * @param {HTMLImageElement[]} array - The array of images to animate.
     */
    playAnimation(array) {
        let index = this.currentImage % array.length;
        this.img = array[index];
        this.currentImage ++
    }
}

