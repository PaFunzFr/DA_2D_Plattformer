/**
 * Class representing a background object that can be moved in the game world.
 */
class backgroundObject extends MovableObject {
    height = 480;

    /**
     * Creates a new background object with the specified image path and position.
     * @param {string} path - The path to the background image.
     * @param {number} x - The x-coordinate position of the background object.
     */
    constructor(path, x) {
        super();
        this.x = x;
        this.y = 480 - this.height;
        this.width = 5179;
        this.loadImage(path);
    }
}