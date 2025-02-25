const sounds = 
    {
        "enemy": {
            "ork": {
                "attack": "./audio/enemy/ork/attack.mp3",
                "hurt": "./audio/enemy/ork/hurt.mp3",
                "death": "./audio/enemy/ork/death.mp3"
            },
            "troll": {
                "attack": "./audio/enemy/troll/attack.mp3",
                "hurt": "./audio/enemy/troll/hurt.mp3",
                "death": "./audio/enemy/troll/death.mp3"
                },
            "dragon": {
                "attack": "./audio/enemy/dragon/attack.mp3",
                "hurt": "./audio/enemy/dragon/hurt.mp3",
                "death": "./audio/enemy/dragon/death.mp3"
            }
        },
        "character": {
            "attack": "./audio/character/attack.mp3",
            "battlecry": "./audio/character/battlecry.mp3",
            "hurt": "./audio/character/hurt.mp3",
            "jump": "./audio/character/jump.mp3",
            "death": "./audio/character/death.mp3"
        },
        "environment": {
            "background": "./audio/environment/background.mp3",
            "footsteps": "./audio/footsteps.mp3",
            "ambient": "./audio/ambient_sound.mp3"
        },
        "other": {
            "menu": "./audio/other/menu_sound.mp3",
            "win": "./audio/other/victory-cry.mp3",
            "lose": "./audio/other/lose_sound.mp3"
        }
    }
;

// enemies
//ork
//troll
//dragon
const soundAttackDragon = new Audio(sounds.enemy.dragon.attack);


// character
const attackSoundCharacter = new Audio(sounds.character.attack);
const battlecrySoundCharacter = new Audio(sounds.character.battlecry);
const hurtSoundCharacter = new Audio(sounds.character.hurt);
const jumpSoundCharacter = new Audio(sounds.character.jump);
const deathSoundCharacter = new Audio(sounds.character.death);

// environment

// other
const backgroundMusic = new Audio(sounds.environment.background);
const victoryCry = new Audio(sounds.other.win);