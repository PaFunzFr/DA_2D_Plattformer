function renderCharSelection() {
    charSelection.innerHTML = '';
    for (let index = 0; index < characterContainer.length; index++) {
        let currentCharacter = characterContainer[index];
        charSelection.innerHTML += `
            <div class="char-container">
                <h2>${currentCharacter.name}</h2>
                <h3>${currentCharacter.title}</h3>
                <img class="char-img" src="./img/01_characters/${currentCharacter.weapon}/6_attack/ATTACK_002.png"/>
                <p class="character-description">${currentCharacter.story}</p>
                <button class="start-game" id="startGame${index}" onclick="startGame('${currentCharacter.weapon}', 2)">Choose ${currentCharacter.name}</button>
            </div>`
    }
    charSelection.innerHTML += `<img class="char-background" src="./img/08_intro/background_ambiente.png">`
    return charSelection.innerHTML
}

function renderPauseMenu() {
    gameDialog.style.display = 'flex';
    gameDialog.innerHTML = `
            <h2>Paused Game</h2>
            <button id="resumeGame">Resume</button>
            <button id="quitGame">Quit Game</button>
    `;
    return gameDialog.innerHTML;
}

function renderGameOver() {
    gameDialog.style.display = 'flex';
    gameDialog.innerHTML = `
            <h2>You have lost!</h2>
            <button id="retryGame">Retry</button>
            <button id="quitGame">Quit Game</button>
    `;
    return gameDialog.innerHTML;
}

function renderNextLevel() {
    gameDialog.style.display = 'flex';
    gameDialog.innerHTML = `
            <h2>You have won!</h2>
            <button id="nextGame">next Stage</button>
            <button id="quitGame">Quit Game</button>
    `;
    return gameDialog.innerHTML;
}

function renderWon() {
    gameDialog.style.display = 'flex';
    gameDialog.innerHTML = `
            <h2>You have won!</h2>
            <h3>The minions who threatened your land and your people are history!
            You have vanquished them! </h3>
            <button id="quitGame">Restart</button>
    `;
    return gameDialog.innerHTML;
}