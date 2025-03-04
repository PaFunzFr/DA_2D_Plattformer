let mutedGlobal = false;
const sounds = {
    ork: {
        hurt: new Audio("./audio/ork/hurt.mp3"),
        death: new Audio("./audio/ork/death.mp3"),
    },
    troll: {
        hurt: new Audio("./audio/troll/hurt.mp3"),
        death: new Audio("./audio/troll/death.mp3"),
    },
    dragon: {
        attack: new Audio("./audio/dragon/attack.mp3"),
        hurt: new Audio("./audio/dragon/hurt.mp3"),
        death: new Audio("./audio/dragon/death.mp3"),
    },
    dragonBoss: {
        attack: new Audio("./audio/dragon/attack.mp3"),
        hurt: new Audio("./audio/dragon/hurt.mp3"),
        death: new Audio("./audio/dragon/death.mp3"),
    },
    character: {
        attack: new Audio("./audio/character/attack.mp3"),
        battlecry: new Audio("./audio/character/battlecry.mp3"),
        hurt: new Audio("./audio/character/hurt.mp3"),
        jump: new Audio("./audio/character/jump.mp3"),
        death: new Audio("./audio/character/death.mp3"),
        axe: new Audio("./audio/character/axe.mp3"),
        club: new Audio("./audio/character/club.mp3"),
        hammer: new Audio("./audio/character/hammer.mp3")
    },
    environment: {
        background: new Audio("./audio/environment/background.mp3"),
        pickup: new Audio("./audio/environment/pickup.mp3"),
        wind: new Audio("./audio/environment/wind.mp3"),
    },
    other: {
        start: new Audio("./audio/other/start.mp3"),
        win: new Audio("./audio/other/victory-cry.mp3"),
    },
};

//loops
sounds.environment.background.loop = true;
sounds.environment.background.volume = 0.6;
sounds.environment.wind.loop = true;
sounds.environment.wind.volume = 0.5;


//preload sounds with API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(target, sound) {
    if (!mutedGlobal) {
    let audio = sounds[target][sound];
    fetch(audio.src)
        .then(response => response.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(buffer => {
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination);
            source.start(0);
        })
        .catch(error => console.error('Error with Web Audio API:', error));
    }
}


function muteAllSounds(mute) {
    sounds.environment.background.muted = mute;
    sounds.environment.wind.muted = mute;
    Object.values(sounds).forEach(category => {
        Object.values(category).forEach(sound => {
            if (sound instanceof Audio) {
                sound.muted = mute;
            }
        });
    });
}

