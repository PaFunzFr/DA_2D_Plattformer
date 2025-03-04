/**
 * Represents a level in the game.
 * 
 * A level contains various elements like enemies, clouds, background objects, collectables, and more.
 * The level has a specified end point at a certain X-coordinate.
 */
class Level {
    enemies;
    cloudsBackground;
    clouds;
    air;
    collectables;
    backgroundObjects;
    levelEndX = 4400;

    /**
     * Creates a new Level object with the specified elements.
     * 
     * @param {Array<Enemy>} enemies - List of enemies in the level.
     * @param {Array<Cloud>} cloudsBackground - List of background clouds.
     * @param {Array<Cloud>} clouds - List of in-level clouds.
     * @param {Array<Object>} backgroundObjects - List of background objects in the level.
     * @param {Air} air - the main Background Layer (color-gradient).
     * @param {Array<Collectable>} collectables - List of collectable items in the level.
     */
    constructor(enemies, cloudsBackground, clouds, backgroundObjects, air, collectables) {
        this.enemies = enemies;
        this.cloudsBackground = cloudsBackground;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.air = air;
        this.collectables = collectables;
    }
}