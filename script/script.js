const charSelection = document.getElementById('charSelection');
const startScreen = document.getElementById('startScreen');
const backgroundVideo = document.getElementById('backgroundVideo');


function renderChars() {
    sounds.environment.background.play()
    sounds.other.start.play();
    //musicActive = false;
    charSelection.style.top = '50%';
    charSelection.style.opacity = 1;
    backgroundVideo.style.opacity = 1;
    startScreen.style.filter = "brightness(100)";
    setTimeout(() => {
        startScreen.style.filter = "brightness(1)";
    }, 300);
    renderCharSelection();
}



