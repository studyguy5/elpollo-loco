
/**
 * @classdesc This class represents the whole level in the game, which contains all the objects and enemies that are present in the level. It also contains the background and the endboss of the level.
 * The level class is used to create the level and to manage the objects and enemies in the level.
 */
class Level {

    /**
     * @property {Object[]} coins the array of coin objects in the level, which is used for the coins in the level
     * @property {Object[]} bottles the array of bottle objects in the level, which is used for the bottles in the level
     * and so on...
     * @property {number} level_end_x the x position of the end of the level, which is used for checking if the character has reached the end of the level
     */
    coins;
    bottles;
    miniEnemies;
    enemies;
    clouds;
    bg;
    endboss;
    level_end_x = 719 * 5;


    /** @constructor spreads the arrays to the keys in this class in order to work with the objects in the level and to 
     * create the level
     * @property {Object[]} coins the array of coin objects in the level
     * @property {Object[]} bottles the array of bottle objects in the level
     * and so on...
     * 
     * @property {number} level_end_x the x position of the end of the level
     */
    constructor(coins, bottles, miniEnemies, enemies, clouds, bg, endboss) {
        this.coins = coins;
        this.bottles = bottles;
        this.miniEnemies = miniEnemies;
        this.enemies = enemies;
        this.clouds = clouds;
        this.bg = bg;
        this.endboss = endboss;
    }
}