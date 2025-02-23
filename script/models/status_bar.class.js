class StatusBar extends DrawableObject {
    healthBarImages = [];
    percentage = 100;
    
    constructor(character, type, length, positionY, initialImg ) {
        super();
        this.character = character;
        this.type = type;
        this.initialImg = initialImg;
        this.length = length;
        this.width = 220;
        this.height= 70;
        this.x = 10;
        this.y = positionY;
        this.loadImage(`../img/brawlnbounce/06_statusbars/1_statusbar/${type}/${character}/B${initialImg}.png`);
        this.preloadImages(this.healthBarImages, `../img/brawlnbounce/06_statusbars/1_statusbar/${type}/${character}/B`, length);
        //this.setPercentage(100);
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

