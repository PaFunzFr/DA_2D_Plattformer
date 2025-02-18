let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    console.log(world.character);
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode === 39) {
        keyboard.clickedRight = true;
        //world.character.moveRight(0.1, );
    }
    if (event.keyCode === 37) {
        keyboard.clickedLeft = true;
        //world.character.moveLeft(0.1, );
    }
    if (event.keyCode === 38 &&!keyboard.isJumping) {
        keyboard.clickedUp = true;
        world.character.jump();
    }
    if (event.keyCode === 40) {
        keyboard.clickedDown = true;
    }
    console.log(event); 
});
// zum verständnis: 
    /*
    character.src = "../img/2_character_pepe/1_idle/long_idle/I-11.png";
    setTimeout(() => {
        ctx.drawImage(character, 20, 20, 50, 150); // x, y, width, height
    }, 2000);
    */