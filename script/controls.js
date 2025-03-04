
let keyboard = new Keyboard();
const btnMobileLeft = document.getElementById("mobileLeft");
const btnMobileRight = document.getElementById("mobileRight");
const btnMobileJump = document.getElementById("mobileJump");
const btnMobileAttack = document.getElementById("mobileAttack");
const btnFullscreen = document.getElementById("gameFullscreen");
const btnGameMute = document.getElementById("gameMute");

/**
 * Checks if a button has been clicked and updates the keyboard state accordingly.
 * @param {KeyboardEvent} event The event object representing the key or button press.
 * @param {string} buttonCode The code of the key or button.
 * @param {string} classNameButton The class name for the button (state).
 * @param {boolean} boolean The boolean value to set the button state (true for pressed, false for released).
 */
function isButtonClicked(event, buttonCode, classNameButton, boolean) {
    if (event.code === buttonCode) {
        keyboard[classNameButton] = boolean;
    }
}

/**
 * Event listener for keydown events to update button states when keys are pressed.
 * @param {KeyboardEvent} event The keydown event.
 */
document.addEventListener("keydown", (event) => {
    isButtonClicked(event, "ArrowRight", "clickedRight", true);
    isButtonClicked(event, "ArrowLeft", "clickedLeft", true);
    isButtonClicked(event, "ArrowUp", "clickedUp", true);
    isButtonClicked(event, "ArrowDown", "clickedDown", true);
    isButtonClicked(event, "Space", "clickedSpace", true);
    isButtonClicked(event, "KeyD", "clickedD", true);
    isButtonClicked(event, "KeyP", "clickedD", true);
});

/**
 * Event listener for keyup events to reset button states when keys are released.
 * @param {KeyboardEvent} event The keyup event.
 */
document.addEventListener("keyup", (event) => {
    isButtonClicked(event, "ArrowRight", "clickedRight", false);
    isButtonClicked(event, "ArrowLeft", "clickedLeft", false);
    isButtonClicked(event, "ArrowUp", "clickedUp", false);
    isButtonClicked(event, "ArrowDown", "clickedDown", false);
    isButtonClicked(event, "Space", "clickedSpace", false);
    isButtonClicked(event, "KeyD", "clickedD", false);
    isButtonClicked(event, "KeyP", "clickedD", false);
});

/**
 * Prevents the default scrolling behavior on mobile devices during touch events.
 * @param {TouchEvent} e The touchmove event.
 */
document.addEventListener("touchmove", (e) => {
    e.preventDefault(); // prevents scrolling
});

/**
 * Sets the `keyboard.clickedRight` state when the mobile right button is pressed.
 * @param {TouchEvent} e The touchstart event.
 */
btnMobileRight.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.clickedRight = true;  
});

/**
 * Resets the `keyboard.clickedRight` state when the mobile right button is released.
 * @param {TouchEvent} e The touchend event.
 */
btnMobileRight.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.clickedRight = false;  
});

/**
 * Sets the `keyboard.clickedLeft` state when the mobile left button is pressed.
 * @param {TouchEvent} e The touchstart event.
 */
btnMobileLeft.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.clickedLeft = true; 
});

/**
 * Resets the `keyboard.clickedLeft` state when the mobile left button is released.
 * @param {TouchEvent} e The touchend event.
 */
btnMobileLeft.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.clickedLeft = false; 
});

/**
 * Sets the `keyboard.clickedUp` state when the mobile jump button is pressed.
 * @param {TouchEvent} e The touchstart event.
 */
btnMobileJump.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.clickedUp = true;
});

/**
 * Resets the `keyboard.clickedUp` state when the mobile jump button is released.
 * @param {TouchEvent} e The touchend event.
 */
btnMobileJump.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.clickedUp = false;
});

/**
 * Sets the `keyboard.clickedD` state when the mobile attack button is pressed.
 * @param {TouchEvent} e The touchstart event.
 */
btnMobileAttack.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.clickedD = true;
});

/**
 * Resets the `keyboard.clickedD` state when the mobile attack button is released.
 * @param {TouchEvent} e The touchend event.
 */
btnMobileAttack.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.clickedD = false;
});