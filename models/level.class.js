class Level {
    bottles;
    miniEnemies;
    enemies;
    clouds;
    bg;
    endboss;
    level_end_x = 719 * 5;


    constructor(bottles, miniEnemies, enemies, clouds, bg, endboss) {
        this.bottles = bottles;
        this.miniEnemies = miniEnemies;
        this.enemies = enemies;
        this.clouds = clouds;
        this.bg = bg;
        this.endboss = endboss;
    }
}