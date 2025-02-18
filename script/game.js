let world;
let pepeIdleImages = [];

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    console.log(world.character);
}


// zum verständnis: 
    /*
    character.src = "../img/2_character_pepe/1_idle/long_idle/I-11.png";
    setTimeout(() => {
        ctx.drawImage(character, 20, 20, 50, 150); // x, y, width, height
    }, 2000);
    */