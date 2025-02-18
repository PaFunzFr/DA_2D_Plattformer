class World {
    character = new Character();
    enemies = [
        new Enemy(),
        new Enemy(),
        new Enemy()
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        // from back
        new backgroundObject("../img/5_background/layers/air.png", 0),
        new backgroundObject("../img/5_background/layers/3_third_layer/1.png", 0),
        new backgroundObject("../img/5_background/layers/3_third_layer/2.png", 0),
        new backgroundObject("../img/5_background/layers/2_second_layer/1.png", 0),
        new backgroundObject("../img/5_background/layers/1_first_layer/1.png", 0),
        // ... to front
    ];
    canvas;
    ctx; 

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // refresh / clear canvas before

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        requestAnimationFrame(this.draw.bind(this)); // bind(this) instead of let self = this and self.draw()
    } 

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }
    addToMap(object) {
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    }
} 