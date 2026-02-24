class Level {
    enemies;
    clouds;
    bg;
    endboss;
    level_end_x = 719 * 5;


    constructor(enemies, clouds, bg, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bg = bg;
        this.endboss = endboss;
    }
}