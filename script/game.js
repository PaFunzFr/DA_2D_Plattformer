let world;
let keyboard = new Keyboard();
const startButton = document.getElementById('startButton');
const canvas = document.getElementById('canvas');
const gameContainer = document.getElementById('gameContainer');

function init() {
    //world = new World(canvas, keyboard, level1);
    //console.log(world.character);
}

function startGame(character) {
    sounds.environment.wind.play();
    sounds.character[character].play();
    setTimeout(() => {
        charSelection.style.opacity = '0';
        charSelection.style.top = '';
        startScreen.style.opacity = '0';
        canvas.style.zIndex = 4;
        canvas.style.opacity = '1';
        setTimeout(() => {
            startScreen.style.display = 'none';
        }, 2000);
        if (typeof world !== "undefined" && world !== null) {
            world.clearAllIntervals();
        }
        world = null;
        let level = loadLevel(3);
        world = new World(canvas, keyboard, level, "3", character);
        console.log(world.character);
    }, 800);
}

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
});

document.addEventListener("keyup", (event) => {
    isButtonClicked(event, "ArrowRight", "clickedRight", false);
    isButtonClicked(event, "ArrowLeft", "clickedLeft", false);
    isButtonClicked(event, "ArrowUp", "clickedUp", false);
    isButtonClicked(event, "ArrowDown", "clickedDown", false);
    isButtonClicked(event, "Space", "clickedSpace", false);
    isButtonClicked(event, "KeyD", "clickedD", false);
});

// toggle Fullscreen
function fullscreen() {
    gameContainer.style.width = "100vw";
    gameContainer.style.height = "100vh";
    gameContainer.style.position = "absolute";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.webkitRequestFullscreen) { /* Safari */
        gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) { /* IE11 */
        gameContainer.msRequestFullscreen();
    }
}