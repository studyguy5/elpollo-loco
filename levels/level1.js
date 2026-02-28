

const level1 = new Level(

    [
        new bottlesOnFloorObject(),
        new bottlesOnFloorObject(),
        new bottlesOnFloorObject(),
        new bottlesOnFloorObject(),
        new bottlesOnFloorObject(),
        new bottlesOnFloorObject(),
        
    ],


    [
        new chicken(),
        new chicken(),
        new chicken(),
    ],

    [
        new cloud(),
        new cloud(),
        new cloud(),
        new cloud(),
    ],

    [
        new background(0, 0, 720, 480, 'img/5_background/layers/air.png'),
        new background(0, 0, 720, 480, 'img/5_background/layers/3_third_layer/1.png'),
        new background(0, 0, 720, 480, 'img/5_background/layers/2_second_layer/1.png'),
        new background(0, 0, 720, 480, 'img/5_background/layers/1_first_layer/1.png'),

        new background(719, 0, 720, 480, 'img/5_background/layers/air.png'),
        new background(719, 0, 720, 480, 'img/5_background/layers/3_third_layer/2.png'),
        new background(719, 0, 720, 480, 'img/5_background/layers/2_second_layer/2.png'),
        new background(719, 0, 720, 480, 'img/5_background/layers/1_first_layer/2.png'),

        new background(719 * 2, 0, 720, 480, 'img/5_background/layers/air.png'),
        new background(719 * 2, 0, 720, 480, 'img/5_background/layers/3_third_layer/1.png'),
        new background(719 * 2, 0, 720, 480, 'img/5_background/layers/2_second_layer/1.png'),
        new background(719 * 2, 0, 720, 480, 'img/5_background/layers/1_first_layer/1.png'),

        new background(719 * 3, 0, 720, 480, 'img/5_background/layers/air.png'),
        new background(719 * 3, 0, 720, 480, 'img/5_background/layers/3_third_layer/2.png'),
        new background(719 * 3, 0, 720, 480, 'img/5_background/layers/2_second_layer/2.png'),
        new background(719 * 3, 0, 720, 480, 'img/5_background/layers/1_first_layer/2.png'),

        new background(719 * 4, 0, 720, 480, 'img/5_background/layers/air.png'),
        new background(719 * 4, 0, 720, 480, 'img/5_background/layers/3_third_layer/1.png'),
        new background(719 * 4, 0, 720, 480, 'img/5_background/layers/2_second_layer/1.png'),
        new background(719 * 4, 0, 720, 480, 'img/5_background/layers/1_first_layer/1.png'),

        new background(719 * 5, 0, 720, 480, 'img/5_background/layers/air.png'),
        new background(719 * 5, 0, 720, 480, 'img/5_background/layers/3_third_layer/2.png'),
        new background(719 * 5, 0, 720, 480, 'img/5_background/layers/2_second_layer/2.png'),
        new background(719 * 5, 0, 720, 480, 'img/5_background/layers/1_first_layer/2.png'),
    ],

    [
        new endboss(500, 80, 400, 400, 'img/4_enemie_boss_chicken/2_alert/G5.png'),
    ]
);