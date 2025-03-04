let nextLevelTriggered = false;
const startButton = document.getElementById('startButton');
const canvas = document.getElementById('canvas');
const gameContainer = document.getElementById('gameContainer');
const mobileInterface = document.getElementById('mobileInterface');
const levelInfo = document.getElementById('levelInfo');
const gameMuteBtn = document.getElementById("gameMute");
const gameDialog = document.getElementById('gameDialog');
const gamePauseBtn = document.getElementById("gamePause");

function startGame(character, levelNumber) {
    sounds.environment.wind.play();
    sounds.character[character].play();
    let level = loadLevel(levelNumber, character);
    setMuteIconOnStart();
    setTimeout(() => {
        hideMenu();
        createInitialWorld(level, levelNumber, character);
        renderLoadingSpinner();
    }, 800);
}

function createInitialWorld(level, levelNumber, character) {
    if (typeof world !== "undefined" && world !== null) {
        world.clearAllIntervals();
    }
    world = null;
    world = new World(canvas, keyboard, level, levelNumber, character);
}

// toggle Fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        setGameStyle("100vw", "100vh", "absolute", "100vw", "100vh");
        setFullScreen();
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreenElement) {
        setGameStyle("", "", "", "", "");
    }
});

function setFullScreen() {
    if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.webkitRequestFullscreen) { /* Safari */
        gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) { /* IE11 */
        gameContainer.msRequestFullscreen();
    }
}

function setGameStyle(gameWidth, gameHeight, gamePosition, canvasWidth, canvasHeight) {
    gameContainer.style.width = gameWidth;
    gameContainer.style.height = gameHeight;
    gameContainer.style.position = gamePosition;
    canvas.style.width = canvasWidth;
    canvas.style.height = canvasHeight;
}  

function setMuteIconOnStart() {
    if (mutedGlobal) {
        gameMuteBtn.src = "./img/09_mobile/muted.png"
    } else {
        gameMuteBtn.src = "./img/09_mobile/mute.png"
    }
}

// test pause game button
function togglePauseGame() {
    world.pauseGame();
    if (world.paused) {
        renderPauseMenu();
    } else if (gameDialog.style.display = "flex"){
        setMuteIconOnStart();
        hideGameDialog();
    }
}

function hideGameDialog() {
    setTimeout(() => {
        gameDialog.style.display = 'none';
        gameDialog.innerHTML = "";
    }, 200);
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