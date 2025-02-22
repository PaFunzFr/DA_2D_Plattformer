function loadLevel(levelNumber) {
    if (levelNumber === 1) {
        return new Level(
            [
                new Enemy("ork", 1, 500 + Math.random() * 100),
                new Enemy("ork", 1, 700 + Math.random() * 100),
                new Enemy("ork", 1, 900 + Math.random() * 100),
                new Enemy("troll", 1, 1300 + Math.random() * 100),
                new Endboss()
            ],
            [
                new Cloud("../img/brawlnbounce/04_background/layers/4_clouds/background_clouds/cloud_bg_1.png", 1255 * 3, 20),
                new Cloud("../img/brawlnbounce/04_background/layers/4_clouds/background_clouds/cloud_bg_1.png", 1255, 70),
                new Cloud("../img/brawlnbounce/04_background/layers/4_clouds/background_clouds/cloud_bg_1.png", 10, 0)
            ],
            [
                new backgroundObject("../img/brawlnbounce/04_background/layers/air_day.png", -1255),
                new backgroundObject("../img/brawlnbounce/04_background/layers/1_first_layer/1.png", -1255),
            ]
        );
    }
    return null;
}