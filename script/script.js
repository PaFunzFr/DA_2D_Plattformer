const charSelection = document.getElementById('charSelection');
const startScreen = document.getElementById('startScreen');


const characterContainer = [
    { 
        "name": "Ulfred", 
        "title": "Stormbreaker", 
        "weapon": "club", 
        "story": "Ulfred crushes his enemies with his mighty club, defending his people in the frozen north." 
    },
    { 
        "name": "Rasnak", 
        "title": "Dragonslayer", 
        "weapon": "axe", 
        "story": "Rasnak wields his axe with deadly precision, cutting down orcs and beasts alike." 
    },
    { 
        "name": "Jognyr", 
        "title": "Trollbane", 
        "weapon": "hammer", 
        "story": "Jognyr smashes through foes with his heavy hammer, standing fearless against the dark." 
    }
];


function renderChars() {
    setTimeout(() => {
        sounds.environment.background.play()
    }, 1000);
    sounds.other.win.play();
    musicActive = false;
    charSelection.style.top = '15vh';
    charSelection.style.opacity = 1;
    charSelection.innerHTML = '';
    for (let index = 0; index < characterContainer.length; index++) {
        let currentCharacter = characterContainer[index];
        charSelection.innerHTML += `
            <div class="char-container">
                <h2>${currentCharacter.name}</h2>
                <h3>${currentCharacter.title}</h3>
                <img class="char-img" src="./img/01_characters/${currentCharacter.weapon}/6_attack/ATTACK_002.png"/>
                <p class="character-description">${currentCharacter.story}</p>
                <button class="start-game" id="startGame${index}" onclick="startGame('${currentCharacter.weapon}')">Choose ${currentCharacter.name}</button>
            </div>`
    }
    charSelection.innerHTML += `<img class="char-background" src="./img/08_intro/background_ambiente.png">`
}

