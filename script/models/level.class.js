class Level {
    enemies;
    clouds;
    backgroundObjects;
    levelEndX = 2100;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}