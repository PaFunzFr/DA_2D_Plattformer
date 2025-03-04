/**
 * Represents a throwable object in the game, extending the MovableObject class.
 * This object can be thrown with a certain speed and acceleration, and interacts with gravity.
 */
class ThrowableObject extends MovableObject {

    speedY = 0;
    speedX = 10;
    acceleration = 0.8;
    elementOnGround = 400;
    otherDirection = false;

    /**
     * Creates an instance of a throwable object.
     * @param {number} x - The x-coordinate of the throwable object.
     * @param {number} y - The y-coordinate of the throwable object.
     * @param {string} name - The name of the throwable object, used to load its image.
     * @param {boolean} [otherDirection=false] - A flag indicating whether the object should face the opposite direction. Default is false.
     */
    constructor(x, y, name, otherDirection = false) {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.otherDirection = otherDirection;
        this.loadImage(`./img/05_throwables/${name}/${name}.png`);
        this.animate();
    }

    /**
     * Animates the object. 
     * If the object is not a fireball, it applies gravity and updates the vertical speed.
     * If the object is a fireball, it triggers the fire missile action.
     */
    animate() {
        if (this.name != "fireball") {
            this.speedY = 5;
            this.applyGravity();
        } else {
            this.fireMissile();
        }
    }  
}