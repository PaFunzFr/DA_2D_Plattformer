const charSelection = document.getElementById('charSelection');
const characterContainer = ["Ulfred","Rasnak","Jognyr"];
const weaponContainer = ["club","axe","hammer"];
const startScreen = document.getElementById('startScreen');

function renderChars() {
    charSelection.style.display = 'flex';
    charSelection.innerHTML = '';
    for (let index = 0; index < characterContainer.length; index++) {
        let characterWeapon = weaponContainer[index];
        charSelection.innerHTML += `
            <div class="char-container">
                <h2>${characterContainer[index]}</h2>
                <img class="char-img" src="./img/brawlnbounce/01_characters/${weaponContainer[index]}/6_attack/ATTACK_002.png" alt="${characterContainer[index]}"/>
                <p class="character-description">Character Description, his Story, Background and favourite Weapon.</p>
                <button class="start-game" id="startGame${index}" onclick="startGame('${characterWeapon}')">Choose ${characterContainer[index]}</button>
            </div>`
    }
    charSelection.innerHTML += `<img class="char-background" src="./img/brawlnbounce/08_intro/background_ambiente.png">`
}
