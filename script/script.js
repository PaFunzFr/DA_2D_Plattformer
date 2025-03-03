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

function addHoverEffect() {
    const characterCards = document.querySelectorAll('.char-container');
    for (let index = 0; index < characterCards.length; index++) {
        const card = characterCards[index];
        const img = document.getElementById(`charImg${index}`);
        card.addEventListener('mouseover', () => {
            card.style.backgroundColor = "#9a57008d";
            img.style.animation = "pulseImg 0.6s infinite alternate ease-in-out";
        });
        card.addEventListener('mouseout', () => {
            card.style.backgroundColor = "";
            img.style.animation = "";
        }); 
    }
}

function fixHeight() {
    document.body.style.height = `${window.innerHeight}px`;
}

window.addEventListener('resize', fixHeight);
fixHeight();