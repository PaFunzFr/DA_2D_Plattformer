let nextLevelTriggered = false;
const startButton = document.getElementById('startButton');
const canvas = document.getElementById('canvas');
const gameContainer = document.getElementById('gameContainer');
const mobileInterface = document.getElementById('mobileInterface');
const levelInfo = document.getElementById('levelInfo');
const gameMuteBtn = document.getElementById("gameMute");
const gameDialog = document.getElementById('gameDialog');

function init() {
    //world = new World(canvas, keyboard, level1);
    //console.log(world.character);
}

function startGame(character, levelNumber) {
    sounds.environment.wind.play();
    sounds.character[character].play();
    let level = loadLevel(levelNumber, character);
    setMuteIconOnStart();
    setTimeout(() => {
        charSelection.style.opacity = '0';
        charSelection.style.top = '';
        canvas.style.zIndex = 4;
        canvas.style.opacity = '1';
        if (typeof world !== "undefined" && world !== null) {
            world.clearAllIntervals();
        }
        world = null;
        world = new World(canvas, keyboard, level, levelNumber, character);
        world.pause = false;
        console.log(world.character);
        renderLoadingSpinner();
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


function globalMute(event) {
    if (startedMuted && mutedGlobal) {
        sounds.environment.wind.play();
        sounds.environment.background.play();
    }
    mutedGlobal = !mutedGlobal;
    console.log(mutedGlobal);
    muteAllSounds(mutedGlobal ? true : false);
    event.target.src = mutedGlobal ? "./img/09_mobile/muted.png" : "./img/09_mobile/mute.png"
}

function setMuteIconOnStart() {
    if (mutedGlobal) {
        gameMuteBtn.src = "./img/09_mobile/muted.png"
    } else {
        gameMuteBtn.src = "./img/09_mobile/mute.png"
    }
}

// test pause game button
const gamePauseBtn = document.getElementById("gamePause");

function togglePauseGame() {
    world.pauseGame();
    if (!world.paused) {
        renderPauseMenu();
    } else if (gameDialog.style.display = "flex"){
        setMuteIconOnStart();
        setTimeout(() => {
            gameDialog.style.display = 'none';
            gameDialog.innerHTML = "";
        }, 200);
    }
}

function nextStage() {
    nextLevelTriggered = true;
    if (!mutedGlobal) {
        muteAllSounds(false);
    }
    if (world.levelNumber === 1) {
        startGame(world.character.character, 2)
    } else {
        startGame(world.character.character, 3) 
    }
}

function retryStage() {
    nextLevelTriggered = true;
    if (!mutedGlobal) {
        muteAllSounds(false);
    }
    startGame(world.character.character, world.levelNumber);
}