let nextLevelTriggered = false;
const startButton = document.getElementById('startButton');
const canvas = document.getElementById('canvas');
const gameContainer = document.getElementById('gameContainer');
const mobileInterface = document.getElementById('mobileInterface');
const levelInfo = document.getElementById('levelInfo');
const gameMuteBtn = document.getElementById("gameMute");
const gameDialog = document.getElementById('gameDialog');
const gamePauseBtn = document.getElementById("gamePause");

/**
 * Starts the game by loading the level and character, and setting up the environment.
 * @param {string} character The character to start the game with.
 * @param {number} levelNumber The level number to start the game at.
 */
function startGame(character, levelNumber) {
    playBackgroundSounds(character);
    let level = loadLevel(levelNumber, character);
    setMuteIconOnStart();
    setTimeout(() => {
        hideMenu();
        createInitialWorld(level, levelNumber, character);
        renderLoadingSpinner();
    }, 800);
}

/**
 * Plays background sounds for the environment and the selected character.
 */
function playBackgroundSounds(character) {
    sounds.environment.wind.play();
    sounds.character[character].play();
}

/**
 * Initializes the game world with the specified level and character.
 * @param {Object} level The current level data.
 * @param {number} levelNumber The number of the current level.
 * @param {string} character The character to use in the game.
 */
function createInitialWorld(level, levelNumber, character) {
    if (typeof world !== "undefined" && world !== null) {
        world.clearAllIntervals();
    }
    world = null;
    world = new World(canvas, keyboard, level, levelNumber, character);
}

/**
 * Toggles fullscreen mode for the game container.
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        setGameStyle("100vw", "100vh", "absolute", "100vw", "100vh");
        setFullScreen();
    } else {
        document.exitFullscreen();
    }
}

/**
 * Handles fullscreen change events to reset game styles.
 */
document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreenElement) {
        setGameStyle("", "", "", "", "");
    }
});

/**
 * Requests fullscreen mode for the game container.
 */
function setFullScreen() {
    if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.webkitRequestFullscreen) { /* Safari */
        gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) { /* IE11 */
        gameContainer.msRequestFullscreen();
    }
}

/**
 * Sets the style for the game container and canvas.
 * @param {string} gameWidth The width of the game container.
 * @param {string} gameHeight The height of the game container.
 * @param {string} gamePosition The position of the game container.
 * @param {string} canvasWidth The width of the canvas.
 * @param {string} canvasHeight The height of the canvas.
 */
function setGameStyle(gameWidth, gameHeight, gamePosition, canvasWidth, canvasHeight) {
    gameContainer.style.width = gameWidth;
    gameContainer.style.height = gameHeight;
    gameContainer.style.position = gamePosition;
    canvas.style.width = canvasWidth;
    canvas.style.height = canvasHeight;
}  

/**
 * Sets the mute icon based on the global mute state.
 */
function setMuteIconOnStart() {
    if (mutedGlobal) {
        gameMuteBtn.src = "./img/09_mobile/muted.png"
    } else {
        gameMuteBtn.src = "./img/09_mobile/mute.png"
    }
}

/**
 * Pauses or unpauses the game and shows the pause menu if the game is paused.
 */
function togglePauseGame() {
    world.pauseGame();
    if (world.paused) {
        renderPauseMenu();
    } else if (gameDialog.style.display = "flex"){
        setMuteIconOnStart();
        hideGameDialog();
    }
}

/**
 * Hides the game dialog after a short delay.
 */
function hideGameDialog() {
    setTimeout(() => {
        gameDialog.style.display = 'none';
        gameDialog.innerHTML = "";
    }, 200);
}

/**
 * Starts the next stage by triggering the next level or retrying the current level.
 */
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

/**
 * Retries the current stage.
 */
function retryStage() {
    nextLevelTriggered = true;
    if (!mutedGlobal) {
        muteAllSounds(false);
    }
    startGame(world.character.character, world.levelNumber);
}