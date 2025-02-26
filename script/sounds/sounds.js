const sounds = {
    ork: {
        attack: new Audio("./audio/enemy/ork/attack.mp3"),
        hurt: new Audio("./audio/enemy/ork/hurt.mp3"),
        death: new Audio("./audio/enemy/ork/death.mp3"),
    },
    troll: {
        attack: new Audio("./audio/enemy/troll/attack.mp3"),
        hurt: new Audio("./audio/enemy/troll/hurt.mp3"),
        death: new Audio("./audio/enemy/troll/death.mp3"),
    },
    dragon: {
        attack: new Audio("./audio/enemy/dragon/attack.mp3"),
        hurt: new Audio("./audio/enemy/dragon/hurt.mp3"),
        death: new Audio("./audio/enemy/dragon/death.mp3"),
    },
    character: {
        attack: new Audio("./audio/character/attack.mp3"),
        battlecry: new Audio("./audio/character/battlecry.mp3"),
        hurt: new Audio("./audio/character/hurt.mp3"),
        jump: new Audio("./audio/character/jump.mp3"),
        death: new Audio("./audio/character/death.mp3"),
    },
    environment: {
        background: new Audio("./audio/environment/background.mp3"),
        footsteps: new Audio("./audio/environment/footsteps.mp3"),
        ambient: new Audio("./audio/environment/ambient_sound.mp3"),
        wind: new Audio("./audio/environment/wind.mp3"),
    },
    other: {
        menu: new Audio("./audio/other/menu_sound.mp3"),
        win: new Audio("./audio/other/victory-cry.mp3"),
        lose: new Audio("./audio/other/lose_sound.mp3"),
    },
};


sounds.environment.background.loop = true;
sounds.environment.wind.loop = true;
