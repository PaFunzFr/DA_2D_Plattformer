class Level {
    enemies;
    cloudsBackground;
    clouds;
    air;
    backgroundObjects;
    levelEndX = 2300;

    constructor(enemies, cloudsBackground, clouds, backgroundObjects, air) {
        this.enemies = enemies;
        this.cloudsBackground = cloudsBackground;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.air = air;
    }
}