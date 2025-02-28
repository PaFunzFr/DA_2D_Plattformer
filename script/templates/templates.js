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