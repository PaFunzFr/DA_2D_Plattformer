class Character extends MovableObject {
    width = 150;
    height = 300;
    currentImage = 0;
    imagesWalking = [];

    constructor() {
        super();
        this.x = 100;
        this.y = 480 - this.height - this.yOffset;
        this.loadImage("../img/2_character_pepe/1_idle/idle/I-1.png");
        this.preloadImages(this.imagesWalking, "../img/2_character_pepe/1_idle/idle/I-", 10);
        this.animate();
    }

    animate() {
        setInterval(() => {
            let index = this.currentImage % this.imagesWalking.length; // modulo, gets rest of number / number, e.g. 5/6 => 5
            this.img = this.imagesWalking[index];
            this.currentImage ++
        }, 150);

        console.log(this.img);
        
    }

    jump() {

    }
}