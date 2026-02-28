class Level {
    bottles
    enemies;
    clouds;
    bg;
    endboss;
    level_end_x = 719 * 5;


    constructor(bottles, enemies, clouds, bg, endboss) {
        this.bottles = bottles;
        this.enemies = enemies;
        this.clouds = clouds;
        this.bg = bg;
        this.endboss = endboss;
    }
}