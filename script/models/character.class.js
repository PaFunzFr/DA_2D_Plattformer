class Character extends MovableObject {
    width = 150;
    height = 250;
    constructor() {
        super();
        this.x = 100;
        this.y = 480 - this.height;
        this.loadImage("../img/2_character_pepe/1_idle/long_idle/I-11.png")
    }
}