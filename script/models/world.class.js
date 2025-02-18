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
        new backgroundObject("../img/5_background/layers/1_first_layer/1.png")
    ]
    canvas;
    ctx; 

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // refresh / clear canvas before
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.addToMap(enemy);  // draw enemy on the canvas every frame
        });
        this.clouds.forEach(cloud => {
            this.addToMap(cloud);
        });
        this.backgroundObjects.forEach(background => {
            this.addToMap(background);
        });
        requestAnimationFrame(this.draw.bind(this)); // bind(this) instead of let self = this and self.draw()
    } 

    addToMap(object) {
            this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);  // draw enemy on the canvas every frame
    }
} 