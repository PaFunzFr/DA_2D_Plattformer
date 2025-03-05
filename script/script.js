const charSelection = document.getElementById('charSelection');
const startScreen = document.getElementById('startScreen');
const backgroundVideo = document.getElementById('backgroundVideo');
const controlMenu = document.getElementById('controlMenu');
let startedMuted = false;

/**
 * Renders the character selection screen, sets game sound, and toggles menu styles.
 */
function renderChars() {
    setGameSound();
    toggleMenuStyle();
    renderCharSelection();
}

/**
 * Plays background sounds if the game is not muted and sets the muted state flag.
 */
function setGameSound() {
    if (!mutedGlobal) {
        sounds.environment.background.play()
        sounds.other.start.play();
    }
    if (mutedGlobal) {
        startedMuted = true;
    }
}

/**
 * Toggles the menu style and transitions from the start screen to character selection.
 */
function toggleMenuStyle() {
    charSelection.style.top = '50%';
    charSelection.style.opacity = 1;
    backgroundVideo.style.opacity = 1;
    startScreen.style.filter = "brightness(100)";
    setTimeout(() => { startScreen.style.filter = "brightness(1)"}, 300);
    startScreen.style.opacity = '0';
    setTimeout(() => {startScreen.style.display = 'none'}, 1000);
}

/**
 * Hides the character selection menu and displays the game canvas.
 */
function hideMenu() {
    charSelection.style.opacity = '0';
    charSelection.style.top = '';
    canvas.style.zIndex = 4;
    canvas.style.opacity = '1';
}

/**
 * Reloads the current page.
 */
function reloadSite() {
    location.reload();
}

/**
 * Adds hover effects to character cards for interactivity.
 */
function addHoverEffect() {
    const characterCards = document.querySelectorAll('.char-container');
    for (let index = 0; index < characterCards.length; index++) {
        const card = characterCards[index];
        const img = document.getElementById(`charImg${index}`);
        effectMouseOver(card, img);
        effectMouseOut(card, img);
    }
}

/**
 * Adds hover effects when mouse enters the character card.
 * @param {HTMLElement} card The character card element.
 * @param {HTMLElement} img The character image element.
 */
function effectMouseOver(card, img) {
    card.addEventListener('mouseover', () => {
        card.style.backgroundColor = "#9a57008d";
        img.style.animation = "pulseImg 0.6s infinite alternate ease-in-out";
    });
}

/**
 * Removes hover effects when mouse leaves the character card.
 * @param {HTMLElement} card The character card element.
 * @param {HTMLElement} img The character image element.
 */
function effectMouseOut(card, img) {
    card.addEventListener('mouseout', () => {
        card.style.backgroundColor = "";
        img.style.animation = "";
    }); 
}

/**
 * Toggles the display of the control menu.
 */
function toggleControlMenu() {
    const isHidden = getComputedStyle(controlMenu).display === 'none';
    controlMenu.style.display = isHidden ? 'flex' : 'none';
}

/**
 * Toggles the global mute state and updates the mute button icon.
 * @param {Event} event The event triggered by the mute button.
 */
function globalMute(event) {
    if (startedMuted && mutedGlobal) {
        sounds.environment.wind.play();
        sounds.environment.background.play();
    }
    mutedGlobal = !mutedGlobal;
    muteAllSounds(mutedGlobal ? true : false);
    event.target.src = mutedGlobal ? "./img/09_mobile/muted.png" : "./img/09_mobile/mute.png"
}