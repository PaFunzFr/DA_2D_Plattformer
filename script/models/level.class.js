class Level {
    enemies;
    cloudsBackground;
    clouds;
    air;
    collectables;
    backgroundObjects;
    levelEndX = 4400;

    constructor(enemies, cloudsBackground, clouds, backgroundObjects, air, collectables) {
        this.enemies = enemies;
        this.cloudsBackground = cloudsBackground;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.air = air;
        this.collectables = collectables;
    }
}