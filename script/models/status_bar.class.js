class StatusBar extends DrawableObject {
    healthBarImages = [];
    percentage = 100;
    
    constructor() {
        super();
        this.width = 200;
        this.height= 50;
        this.x = 10;
        this.y = 10;
        this.loadImage("../img/7_statusbars/1_statusbar/2_statusbar_health/blue/B6.png")
        this.preloadImages(this.healthBarImages, "img/7_statusbars/1_statusbar/2_statusbar_health/blue/B", 6);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let imagePath = this.healthBarImages[this.resolveImageIndex()];
        this.loadImage(imagePath.src);
    }

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

