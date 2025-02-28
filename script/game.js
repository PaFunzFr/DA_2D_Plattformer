let world;
const startButton = document.getElementById('startButton');
const canvas = document.getElementById('canvas');
const gameContainer = document.getElementById('gameContainer');
const mobileInterface = document.getElementById('mobileInterface');
const levelInfo = document.getElementById('levelInfo');

function init() {
    //world = new World(canvas, keyboard, level1);
    //console.log(world.character);
}

function startGame(character, levelNumber) {
    sounds.environment.wind.play();
    sounds.character[character].play();
    let level = loadLevel(levelNumber, character);
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
        world = new World(canvas, keyboard, level, levelNumber, character);
        console.log(world.character);
    }, 800);
}


// toggle Fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
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
    } else {
        document.exitFullscreen();
        gameContainer.style.width = ""; 
        gameContainer.style.height = ""; 
        gameContainer.style.position = "";
        canvas.style.width = "";
        canvas.style.height = "";
    }
}

document.getElementById("fullscreenButton").onclick = toggleFullscreen;


// TEST mute BUTTON
const globalMuteBtn = document.getElementById("globalMuteBtn");

function globalMute() {
    mutedGlobal = !mutedGlobal;
    console.log(mutedGlobal);
    muteAllSounds(mutedGlobal ? true : false);
}
