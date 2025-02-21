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
                new Cloud("../img/5_background/layers/4_clouds/1.png", 719 * 3, 20),
                new Cloud("../img/5_background/layers/4_clouds/2.png", 719, 70),
                new Cloud("../img/5_background/layers/4_clouds/1.png", 10, 0)
            ],
            [
                new backgroundObject("../img/5_background/layers/air.png", -719 * 3),
                new backgroundObject("../img/5_background/layers/3_third_layer/2.png", -719 * 3),
                new backgroundObject("../img/5_background/layers/2_second_layer/2.png", -719 * 3),
                new backgroundObject("../img/5_background/layers/1_first_layer/2.png", -719 * 3),

                new backgroundObject("../img/5_background/layers/air.png", -719 * 2),
                new backgroundObject("../img/5_background/layers/3_third_layer/1.png", -719 * 2),
                new backgroundObject("../img/5_background/layers/2_second_layer/1.png", -719 * 2),
                new backgroundObject("../img/5_background/layers/1_first_layer/1.png", -719 * 2),

                new backgroundObject("../img/5_background/layers/air.png", -719),
                new backgroundObject("../img/5_background/layers/3_third_layer/2.png", -719),
                new backgroundObject("../img/5_background/layers/2_second_layer/2.png", -719),
                new backgroundObject("../img/5_background/layers/1_first_layer/2.png", -719),

                new backgroundObject("../img/5_background/layers/air.png", 0),
                new backgroundObject("../img/5_background/layers/3_third_layer/1.png", 0),
                new backgroundObject("../img/5_background/layers/2_second_layer/1.png", 0),
                new backgroundObject("../img/5_background/layers/1_first_layer/1.png", 0),

                new backgroundObject("../img/5_background/layers/air.png", 719),
                new backgroundObject("../img/5_background/layers/3_third_layer/2.png", 719),
                new backgroundObject("../img/5_background/layers/2_second_layer/2.png", 719),
                new backgroundObject("../img/5_background/layers/1_first_layer/2.png", 719),

                new backgroundObject("../img/5_background/layers/air.png", 719 * 2),
                new backgroundObject("../img/5_background/layers/3_third_layer/1.png", 719 * 2),
                new backgroundObject("../img/5_background/layers/2_second_layer/1.png", 719 * 2),
                new backgroundObject("../img/5_background/layers/1_first_layer/1.png", 719 * 2),

                new backgroundObject("../img/5_background/layers/air.png", 719 * 3),
                new backgroundObject("../img/5_background/layers/3_third_layer/2.png", 719 * 3),
                new backgroundObject("../img/5_background/layers/2_second_layer/2.png", 719 * 3),
                new backgroundObject("../img/5_background/layers/1_first_layer/2.png", 719 * 3)
            ]
        );
    }
    return null;
}