/**
 * Class representing a cloud object that moves across the screen.
 */
class Cloud extends MovableObject {
    height;
    width;
    speed;

    /**
     * Creates a new cloud object with specified attributes and position.
     * @param {string} path - The path to the image representing the cloud.
     * @param {number} xOffset - The initial X position offset for the cloud.
     * @param {number} yOffset - The initial Y position offset for the cloud.
     * @param {string} position - The position type of the cloud (e.g., "background", "foreground").
     */
    constructor(path, xOffset, yOffset, position) {
        super();
        this.setCloudAttributes(position);
        this.loadImage(path)
        this.position = position;
        this.y = 30 + yOffset;
        this.x = xOffset + Math.random() * 200;
        this.animate();
    }

    /**
     * Sets the cloud's attributes based on its position (e.g., size and speed).
     * @param {string} position - The position type of the cloud (e.g., "background", "foreground").
     */
    setCloudAttributes(position) {
        if (position === "background") {
            this.height = 300;
            this.width= 500;
            this.speed = 0.005 + Math.random() * 0.4;
        } else if (position === "foreground") {
            this.height = 150;
            this.width= 400;
            this.speed = 0.01 + Math.random() * 0.5;
        } else if (position === "swamp-background") {
            this.height = 400;
            this.width= 1000;
            this.speed = 0.005 + Math.random() * 0.3;
        } else if (position === "swamp-foreground") {
            this.height = 300;
            this.width= 1000;
            this.speed = 0.005 + Math.random() * 0.8;
        } else if (position === "cave-background") {
            this.height = 400;
            this.width= 1000;
            this.speed = 0.005 + Math.random() * 0.3;
        } else if (position === "cave-foreground") {
            this.height = 300;
            this.width= 1000;
            this.speed = 0.005 + Math.random() * 0.8;
        }
    }

    /**
     * Starts the animation loop for the cloud, making it move left continuously.
     * Resets the cloud's position when it moves off the screen.
     */
    animate() {
        setInterval(() => {
            this.moveLeft(this.speed);
            if (this.x < - 700) {
                this.x = 5200;
            }
        }, 1000 / 60);
    }
}