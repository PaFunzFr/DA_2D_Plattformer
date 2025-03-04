const charSelection = document.getElementById('charSelection');
const startScreen = document.getElementById('startScreen');
const backgroundVideo = document.getElementById('backgroundVideo');
const controlMenu = document.getElementById('controlMenu');
let startedMuted = false;

function renderChars() {
    setGameSound();
    toggleMenuStyle();
    renderCharSelection();
}

function setGameSound() {
    if (!mutedGlobal) {
        sounds.environment.background.play()
        sounds.other.start.play();
    }
    if (mutedGlobal) {
        startedMuted = true;
    }
}

function toggleMenuStyle() {
    charSelection.style.top = '50%';
    charSelection.style.opacity = 1;
    backgroundVideo.style.opacity = 1;
    startScreen.style.filter = "brightness(100)";
    setTimeout(() => { startScreen.style.filter = "brightness(1)"}, 300);
    startScreen.style.opacity = '0';
    setTimeout(() => {startScreen.style.display = 'none'}, 1000);
}

function hideMenu() {
    charSelection.style.opacity = '0';
    charSelection.style.top = '';
    canvas.style.zIndex = 4;
    canvas.style.opacity = '1';
}

function reloadSite() {
    location.reload();
}

function addHoverEffect() {
    const characterCards = document.querySelectorAll('.char-container');
    for (let index = 0; index < characterCards.length; index++) {
        const card = characterCards[index];
        const img = document.getElementById(`charImg${index}`);
        effectMouseOver(card, img);
        effectMouseOut(card, img);
    }
}

function effectMouseOver(card, img) {
    card.addEventListener('mouseover', () => {
        card.style.backgroundColor = "#9a57008d";
        img.style.animation = "pulseImg 0.6s infinite alternate ease-in-out";
    });
}

function effectMouseOut(card, img) {
    card.addEventListener('mouseout', () => {
        card.style.backgroundColor = "";
        img.style.animation = "";
    }); 
}

function toggleControlMenu() {
    const isHidden = getComputedStyle(controlMenu).display === 'none';
    controlMenu.style.display = isHidden ? 'flex' : 'none';
}

// MUTE BUTTON
function globalMute(event) {
    if (startedMuted && mutedGlobal) {
        sounds.environment.wind.play();
        sounds.environment.background.play();
    }
    mutedGlobal = !mutedGlobal;
    muteAllSounds(mutedGlobal ? true : false);
    event.target.src = mutedGlobal ? "./img/09_mobile/muted.png" : "./img/09_mobile/mute.png"
}