
let keyboard = new Keyboard();
function isButtonClicked(event, buttonCode, classNameButton, boolean) {
    if (event.code === buttonCode) {
        keyboard[classNameButton] = boolean;
    }
}

document.addEventListener("keydown", (event) => {
    isButtonClicked(event, "ArrowRight", "clickedRight", true);
    isButtonClicked(event, "ArrowLeft", "clickedLeft", true);
    isButtonClicked(event, "ArrowUp", "clickedUp", true);
    isButtonClicked(event, "ArrowDown", "clickedDown", true);
    isButtonClicked(event, "Space", "clickedSpace", true);
    isButtonClicked(event, "KeyD", "clickedD", true);
    isButtonClicked(event, "KeyP", "clickedD", true);
});

document.addEventListener("keyup", (event) => {
    isButtonClicked(event, "ArrowRight", "clickedRight", false);
    isButtonClicked(event, "ArrowLeft", "clickedLeft", false);
    isButtonClicked(event, "ArrowUp", "clickedUp", false);
    isButtonClicked(event, "ArrowDown", "clickedDown", false);
    isButtonClicked(event, "Space", "clickedSpace", false);
    isButtonClicked(event, "KeyD", "clickedD", false);
    isButtonClicked(event, "KeyP", "clickedD", false);
});


// mobile devices
const btnMobileLeft = document.getElementById("mobileLeft");
const btnMobileRight = document.getElementById("mobileRight");
const btnMobileJump = document.getElementById("mobileJump");
const btnMobileAttack = document.getElementById("mobileAttack");

/*
document.addEventListener("touchend", () => {
    keyboard.clickedLeft = false;
    keyboard.clickedRight = false;
    keyboard.clickedUp = false;
    keyboard.clickedDown = false;
    keyboard.clickedSpace = false;
    keyboard.clickedD = false;
});
*/

document.addEventListener("touchmove", (e) => {
    e.preventDefault(); // prevents scrolling
});

btnMobileRight.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.clickedRight = true;  
});

btnMobileRight.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.clickedRight = false;  
});

btnMobileLeft.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.clickedLeft = true; 
});

btnMobileLeft.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.clickedLeft = false; 
});

btnMobileJump.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.clickedUp = true;
});

btnMobileJump.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.clickedUp = false;
});

btnMobileAttack.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.clickedD = true;
});

btnMobileAttack.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.clickedD = false;
});