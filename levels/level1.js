
/**
 * @class level1 this is the main level of the game and it initializes all the objects and enemies in the level and sves it
 * in the level1 variable
 */
let level1 = new Level(

    /**
     * @property {Object[]} coins the array of coin objects in the level
     * @type {Object[]} bottlesOnFloorObject the array of bottle objects in the level, they are on the floor ready
     * to collect for the character
     * @type {Object[]} miniChicken the array of mini chicken objects in the level
     * @type {Object[]} chicken the array of chicken objects in the level
     * @type {Object[]} clouds the array of cloud objects in the level
     * @type {Object[]} background the array of background objects in the level, we copy the backgrounds and put it 
     * on the right position to create a longer world to walk for the character
     * @type {Object} endboss the endboss object in the level
     */
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ],

    [
        new bottlesOnFloorObject(),
        new bottlesOnFloorObject(),
        new bottlesOnFloorObject(),
        new bottlesOnFloorObject(),
        new bottlesOnFloorObject(),
        new bottlesOnFloorObject(),
        
    ],

    [
        new miniChicken(),
        new miniChicken(),
        new miniChicken(),
        new miniChicken(),
        new miniChicken(),
        new miniChicken(),
    ],

    [
        new chicken(),
        new chicken(),
        new chicken(),
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
        new endboss(3400, 80, 400, 400, 'img/4_enemie_boss_chicken/2_alert/G5.png'),
    ]
);