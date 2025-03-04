/**
 * Renders the character selection menu in the game, displaying available characters.
 * Each character's name, title, image, and description are shown, and clicking on a character starts the game.
 * @returns {string} The HTML content for the character selection screen.
 */
function renderCharSelection() {
    charSelection.innerHTML = '';
    for (let index = 0; index < characterContainer.length; index++) {
        let currentCharacter = characterContainer[index];
        charSelection.innerHTML += `
            <div class="char-container" onclick="startGame('${currentCharacter.weapon}', 1)">
                <h2>${currentCharacter.name}</h2>
                <h3>${currentCharacter.title}</h3>
                <img id="charImg${index}"class="char-img" src="./img/01_characters/${currentCharacter.weapon}/6_attack/ATTACK_002.png"/>
                <p class="character-description">${currentCharacter.story}</p>
            </div>`
    }
    charSelection.innerHTML += `<img class="char-background" src="./img/08_intro/background_ambiente.png">`
    addHoverEffect();
    return charSelection.innerHTML;
}

/**
 * Renders the pause menu when the game is paused.
 * Displays options to resume or quit the game.
 * @returns {string} The HTML content for the pause menu.
 */
function renderPauseMenu() {
    gameDialog.style.display = 'flex';
    gameDialog.innerHTML = `
            <h2>Paused Game</h2>
            <button id="resumeGame" onclick="togglePauseGame()">Resume</button>
            <button id="quitGame" onclick="reloadSite()">Quit Game</button>`;
    return gameDialog.innerHTML;
}

/**
 * Renders the game over screen when the player loses the game.
 * Displays options to retry the stage or quit the game.
 * @returns {string} The HTML content for the game over screen.
 */
function renderGameOver() {
    gameDialog.style.display = 'flex';
    gameDialog.innerHTML = `
            <h2>You have lost!</h2>
            <button id="retryGame" onclick="retryStage()">Retry</button>
            <button id="quitGame" onclick="reloadSite()">Quit Game</button>`;
    return gameDialog.innerHTML;
}

/**
 * Renders the next stage dialog when the player wins a stage.
 * Displays options to move to the next stage or quit the game.
 * @returns {string} The HTML content for the next stage dialog.
 */
function renderNextStageDialog() {
    gameDialog.style.display = 'flex';
    gameDialog.innerHTML = `
            <h2>You have won!</h2>
            <button id="nextGame" onclick="nextStage()">next Stage</button>
            <button id="quitGame" onclick="reloadSite()">Quit Game</button>`;
    return gameDialog.innerHTML;
}

/**
 * Renders the victory screen when the player wins the game.
 * Displays a message of victory and an option to restart the game.
 * @returns {string} The HTML content for the victory screen.
 */
function renderWon() {
    gameDialog.style.display = 'flex';
    gameDialog.innerHTML = `
            <h2>You have won!</h2>
            <h3>The minions who threatened your land and your people are history!
            You have vanquished them! </h3>
            <button id="quitGame" onclick="reloadSite()">Restart Game</button>`;
    return gameDialog.innerHTML;
}

/**
 * Renders a loading spinner while the game content is loading.
 * Displays a spinner animation to indicate loading progress.
 * @returns {string} The HTML content for the loading spinner.
 */
function renderLoadingSpinner() {
    gameDialog.style.display = 'flex';
    gameDialog.innerHTML = `
            <div id="loadingSpinner" class="spinner"></div>`;
    return gameDialog.innerHTML;
}