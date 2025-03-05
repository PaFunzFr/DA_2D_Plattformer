/**
 * Represents a status bar in the game, typically used to display health or weapon status.
 * Inherits from the DrawableObject class.
 */
class StatusBar extends DrawableObject {
    healthBarImages = [];
    percentage = 100;
    throwableAmount;
    
    /**
     * Creates an instance of a status bar.
     * @param {Object} character - The character to which the status bar belongs.
     * @param {string} type - The type of status bar (e.g., "health" or "weapon").
     * @param {number} length - The number of images used to represent different percentages of the status.
     * @param {number} positionX - The x-coordinate of the status bar on the screen.
     * @param {number} positionY - The y-coordinate of the status bar on the screen.
     * @param {number} throwableAmount - The amount of throwable objects available (used for weapon status).
     */
    constructor(character, type, length, positionX, positionY, throwableAmount) {
        super();
        this.character = character;
        this.throwableAmount = throwableAmount;
        this.type = type;
        this.initialImg = length -1;
        this.length = length;
        this.width = 300;
        this.height= 70;
        this.x = positionX;
        this.y = positionY;
        this.loadImage(`./img/06_statusbars/1_statusbar/${type}/${character}/B${this.initialImg}.png`);
        this.preloadImages(this.healthBarImages, `./img/06_statusbars/1_statusbar/${type}/${character}/B`, length);
    }

    /**
     * Sets the percentage value for the status bar (e.g., health or weapon status).
     * @param {number} percentage - The percentage value to set (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.healthBarImages[this.resolveImageIndex()];
        this.loadImage(imagePath.src);
    }

    /**
     * Updates the weapon amount on the status bar based on the throwable objects available.
     * @param {number} throwableAmount - The number of throwable objects available (used to update weapon status).
     */
    setWeaponAmount(throwableAmount) {
        let index = Math.min(throwableAmount, this.healthBarImages.length - 1);
        let imagePath = this.healthBarImages[index];
        this.loadImage(imagePath.src);
    }
    
    /**
     * Resolves the index for the correct image to display based on the current percentage.
     * @returns {number} The index of the image that corresponds to the current health percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

