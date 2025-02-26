class StatusBar extends DrawableObject {
    healthBarImages = [];
    percentage = 100;
    throwableAmount;
    
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
        //this.setPercentage(100);
        //this.setWeaponAmount(throwableAmount);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let imagePath = this.healthBarImages[this.resolveImageIndex()];
        this.loadImage(imagePath.src);
    }

    setWeaponAmount(throwableAmount) {
        let index = Math.min(throwableAmount, this.healthBarImages.length - 1);
        let imagePath = this.healthBarImages[index];
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

