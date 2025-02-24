function loadLevel(levelNumber) {
    if (levelNumber === 1) {
        // constructor (enemies, clouds, backgroundObjects, air)
        return new Level(
            // enemies
            [
                //new Enemy("ork", 1, 500 + Math.random() * 100),
                //new Enemy("ork", 1, 700 + Math.random() * 100),
                //new Enemy("ork", 1, 900 + Math.random() * 100),
                //new Enemy("troll", 1, 1300 + Math.random() * 100),
                new Endboss()
            ],
            //clouds background
            [
                new Cloud("../img/brawlnbounce/04_background/layers/4_clouds/background_clouds/cloud_bg_1.png", 1255 * 3, -70, "background"),
                new Cloud("../img/brawlnbounce/04_background/layers/4_clouds/background_clouds/cloud_bg_2.png", 1255, 70, "background"),
                new Cloud("../img/brawlnbounce/04_background/layers/4_clouds/background_clouds/cloud_bg_3.png", 10, 0, "background"),
                new Cloud("../img/brawlnbounce/04_background/layers/4_clouds/background_clouds/cloud_bg_1.png", 1255 * 2, -40, "background"),
            ],
            //clouds
            [
                new Cloud("../img/brawlnbounce/04_background/layers/4_clouds/cloud_1.png", 1255, 0, "foreground"),
                new Cloud("../img/brawlnbounce/04_background/layers/4_clouds/cloud_2.png", 1755, -80, "foreground"),
                new Cloud("../img/brawlnbounce/04_background/layers/4_clouds/cloud_3.png", 655, 20, "foreground"),
                new Cloud("../img/brawlnbounce/04_background/layers/4_clouds/cloud_1.png", -1005, -30, "foreground"),
            ],
            //backgroundObjects
            [
                new backgroundObject("../img/brawlnbounce/04_background/layers/1_first_layer/1.png", -1255),
            ],
            //air
            [
                new backgroundObject("../img/brawlnbounce/04_background/layers/air_day.png", -1255),
            ],
        );
    }
    return null;
}