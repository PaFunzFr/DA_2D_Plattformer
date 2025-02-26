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
    sounds.character.battlecry.play();
    charSelection.style.opacity = '0';
    charSelection.style.top = '';
    startScreen.style.opacity = '0';
    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 2000);
    if (typeof world !== "undefined" && world !== null) {
        world.clearAllIntervals();
    }
    world = null;
    let level = loadLevel(1);
    world = new World(canvas, keyboard, level, character);
    console.log(world.character);
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

// zum verständnis: 
    /*
    character.src = "../img/2_character_pepe/1_idle/long_idle/I-11.png";
    setTimeout(() => {
        ctx.drawImage(character, 20, 20, 50, 150); // x, y, width, height
    }, 2000);
    */

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