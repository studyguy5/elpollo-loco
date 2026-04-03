
/**
 * @classdesc this class is used to store the state of the keyboard, which keys are pressed and which are not, 
 * it is used to control the character and the actions in the game
 * it has properties for the left, right, space, s, up, down, jump and d keys, which are used to control 
 * the character and the actions in the game
 */
class keyBoard {

    /**
     * @property {boolean} Left is the state of the left key in order to move the character left
     * @property {boolean} Right is the state of the right key in order to move the character right
     * @property {boolean} Space is the state of the space key in order to make the character jump
     * @property {boolean} Jump is the state of the jump key in order to make the character jump
     * @property {boolean} d is the state of the d key in order to throw a bottle, which is used for throwing bottles in the game
     */
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    JUMP = false;
    d = false;
    // constructor() {

    // }
}