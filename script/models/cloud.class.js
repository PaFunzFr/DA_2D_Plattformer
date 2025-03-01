class Cloud extends MovableObject {
    height;
    width;
    speed;

    constructor(path, xOffset, yOffset, position) {
        super();
        this.setCloudAttributes(position);
        this.loadImage(path)
        this.position = position;
        this.y = 30 + yOffset;
        this.x = xOffset + Math.random() * 200;
        this.animate();
    }

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
        }
        else if (position === "cave-background") {
            this.height = 400;
            this.width= 1000;
            this.speed = 0.005 + Math.random() * 0.3;
        } else if (position === "cave-foreground") {
            this.height = 300;
            this.width= 1000;
            this.speed = 0.005 + Math.random() * 0.8;
        }
         
     }

    animate() {
        setInterval(() => {
            this.moveLeft(this.speed);
            if (this.x < - 1400) {
                this.x = 2579;
            }
        }, 1000 / 60);
    }
}