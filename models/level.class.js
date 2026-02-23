class Level {
    enemies;
    clouds;
    bg;
    level_end_x = 719 * 5;


    constructor(enemies, clouds, bg) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bg = bg;
    }
}