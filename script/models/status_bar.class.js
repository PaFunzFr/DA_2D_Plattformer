class StatusBar extends DrawableObject {
    healthBarImages = [];
    percentage = 100;


    constructor() {

        this.loadImage("../img/7_statusbars/1_statusbar/2_statusbar_health/blue/6.png")
        this.preloadImages(this.healthBarImages, "img/3_enemies_chicken/chicken_normal/1_walk/w_", 6);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let imagePath = this.healthBarImages[this.reslolveImageIndex()]
        this.loadImage(imagePath);
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 90) {
            return 4;
        } else if (this.percentage >= 80) {
            return 3;
        } else if (this.percentage >= 70) {
            return 2;
        } else if (this.percentage >= 60) {
            return 1;
        } else {
            return 0;
        }
    }

}

