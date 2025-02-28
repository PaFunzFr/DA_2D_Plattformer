const charSelection = document.getElementById('charSelection');
const startScreen = document.getElementById('startScreen');
const backgroundVideo = document.getElementById('backgroundVideo');
let startedMuted = false;



function renderChars() {
    if (!mutedGlobal) {
        sounds.environment.background.play()
        sounds.other.start.play();
    }
    if (mutedGlobal) {
        startedMuted = true;
    }
    charSelection.style.top = '50%';
    charSelection.style.opacity = 1;
    backgroundVideo.style.opacity = 1;
    startScreen.style.filter = "brightness(100)";
    setTimeout(() => {
        startScreen.style.filter = "brightness(1)";
    }, 300);
    startScreen.style.opacity = '0';
    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 1000);
    renderCharSelection();
}


function reloadSite() {
    location.reload();
}


