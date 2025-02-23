let world;
let keyboard = new Keyboard();
const startButton = document.getElementById('startButton');

function init() {
    canvas = document.getElementById("canvas");
    //world = new World(canvas, keyboard, level1);
    //console.log(world.character);
}

function startGame(character) {
    charSelection.style.display = 'none';
    startScreen.style.display = 'none';
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