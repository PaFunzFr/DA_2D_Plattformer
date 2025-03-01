function loadLevel(levelNumber, character) {
    if (levelNumber === 1) {
        // constructor (enemies, clouds, backgroundObjects, air)
        return new Level(
            // enemies
            [
                new Enemy("dragon", 1, 2500 + Math.random() * 100),
                new Enemy("dragon", 1, 1500 + Math.random() * 100),
                new Enemy("ork", 1, 500 + Math.random() * 100),
                new Enemy("ork", 1, 700 + Math.random() * 100),
                new Enemy("ork", 1, 900 + Math.random() * 100),
                new Enemy("troll", 1, 1300 + Math.random() * 100),
                new Endboss(1)
            ],
            //clouds background
            [
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_1.png", 1255 * 3, -70, "background"),
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_2.png", 1255, 70, "background"),
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_3.png", 10, 0, "background"),
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_1.png", 1255 * 2, -40, "background"),
            ],
            //clouds
            [
                new Cloud("./img/04_background/layers/4_clouds/cloud_1.png", 1255, 0, "foreground"),
                new Cloud("./img/04_background/layers/4_clouds/cloud_2.png", 1755, -80, "foreground"),
                new Cloud("./img/04_background/layers/4_clouds/cloud_3.png", 655, 20, "foreground"),
                new Cloud("./img/04_background/layers/4_clouds/cloud_1.png", -1005, -30, "foreground"),
            ],
            //backgroundObjects
            [
                new backgroundObject("./img/04_background/layers/1_first_layer/1.png", -1255),
            ],
            //air
            [
                new backgroundObject("./img/04_background/layers/air_day.png", -1255),
            ],
            // collectables
            [
                new Collectable("thorshammer", 100),
            ]
        );
    };
    if (levelNumber === 2) {
        // constructor (enemies, clouds, backgroundObjects, air)
        return new Level(
            // enemies
            [
                new Enemy("dragon", 2, 2500 + Math.random() * 100),
                new Enemy("dragon", 2, 1500 + Math.random() * 100),
                new Enemy("ork", 2, 500 + Math.random() * 100),
                new Enemy("ork", 2, 700 + Math.random() * 100),
                new Enemy("ork", 2, 900 + Math.random() * 100),
                new Enemy("troll", 2, 1300 + Math.random() * 100),
                new Endboss(2)
            ],
            //clouds background
            [
            ],
            //clouds
            [
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_swamp_1.png", 1255 * 3, -70, "swamp-background"),
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_swamp_2.png", 1255, 0, "swamp-background"),
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_swamp_3.png", 10, -70, "swamp-background"),
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_swamp_1.png", 1255 * 2, 0, "swamp-background"),
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_swamp_3.png", 700, -70, "swamp-background"),
                new Cloud("./img/04_background/layers/4_clouds/fog_swamp_1.png", 1255, 160, "swamp-foreground"),
                new Cloud("./img/04_background/layers/4_clouds/fog_swamp_2.png", 1755, 180, "swamp-foreground"),
                new Cloud("./img/04_background/layers/4_clouds/fog_swamp_1.png", 655, 160, "swamp-foreground"),
                new Cloud("./img/04_background/layers/4_clouds/fog_swamp_2.png", -1005, 180, "swamp-foreground"),
                new Cloud("./img/04_background/layers/4_clouds/fog_swamp_1.png", 10, 160, "swamp-foreground"),
            ],
            //backgroundObjects
            [
                new backgroundObject("./img/04_background/layers/1_first_layer/2.jpg", -1255),
            ],
            //air
            [
                new backgroundObject("./img/04_background/layers/air_day.png", -1255),
            ],
            // collectables
            [
                new Collectable("thorshammer", 100),
                new Collectable("axe", -400),
            ]
        );
    };
    if (levelNumber === 3) {
        // constructor (enemies, clouds, backgroundObjects, air)
        return new Level(
            // enemies
            [
                new Enemy("dragon", 3, 2500 + Math.random() * 100),
                new Enemy("dragon", 3, 1500 + Math.random() * 100),
                new Enemy("ork", 3, 500 + Math.random() * 100),
                new Enemy("ork", 3, 700 + Math.random() * 100),
                new Enemy("ork", 3, 900 + Math.random() * 100),
                new Enemy("troll", 3, 1300 + Math.random() * 100),
                new Endboss(3)
            ],
            //clouds background
            [
            ],
            //clouds
            [
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_cave_1.png", 1255 * 3, -70, "cave-background"),
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_cave_2.png", 1255, 70, "cave-background"),
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_cave_1.png", 10, 0, "cave-background"),
                new Cloud("./img/04_background/layers/4_clouds/background_clouds/cloud_bg_cave_1.png", 1255 * 2, -40, "cave-background"),
                new Cloud("./img/04_background/layers/4_clouds/fog_cave_1.png", 1255, 0, "cave-foreground"),
                new Cloud("./img/04_background/layers/4_clouds/fog_cave_2.png", 1755, -80, "cave-foreground"),
                new Cloud("./img/04_background/layers/4_clouds/fog_cave_1.png", 655, 20, "cave-foreground"),
                new Cloud("./img/04_background/layers/4_clouds/fog_cave_2.png", -1005, -30, "cave-foreground"),
            ],
            //backgroundObjects
            [
                new backgroundObject("./img/04_background/layers/1_first_layer/3.jpg", -1255),
            ],
            //air
            [
                new backgroundObject("./img/04_background/layers/air_day.png", -1255),
            ],
            // collectables
            [
                new Collectable("thorshammer", 100),
                new Collectable(character, -400),
            ]
        );
    }
    return null;
}