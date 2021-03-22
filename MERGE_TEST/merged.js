// wrap everything in the self-executed async function for scope etc. purposes.

// ************************************* Fetch data and create Character objects *************************************
(async function getData() {
    const TARGET_JSON = "https://raw.githubusercontent.com/tna007/simplified-js-game/fetch_villain/test.json"; // our own .json file.

    let response = await fetch(`${TARGET_JSON}`);
    let json = await response.json();
    console.log("Object Test v1.5");

    let randomNum = Math.round(Math.random() * 4); // random number to specify enemy type.

    let winCount = 0;

    class Character {
        constructor(id, health, damage, defense, imageurl, whichFunc, ultra) {
            this.id = id;
            this.health = health;
            this.damage = damage;
            this.defense = defense;
            this.imageurl = imageurl;
            this.whichFunc = whichFunc; // variable that is passed into getMethod to acquire correct function from methodArray.
            this.ultra = ultra; // secondary function.
        }
        getMethod(x) {
            methodArray[x](); // when a Character class object calls getMethod, it will execute a function from methodArray based on the parameter that is passed.
        }
        getUltra(x) {
            methodUltraArray[x]();
        }
    }

    let player = new Character("Hero", 10, 6, 1, "https://public.bc.fi/s2100145/simpleRPGsprites/hero.png.png", 5, 0); // note: whichFunc, the last value, will need to be changed depending on which index in methodArray the player's attack function is.

    let enemy = new Character(json.enemies[randomNum].id, json.enemies[randomNum].health, json.enemies[randomNum].damage, json.enemies[randomNum].defense, json.enemies[randomNum].imageurl, json.enemies[randomNum].whichFunc); // first enemy created.

// ************************************* Images *************************************

    let sprite = document.querySelector("#sprite");
    sprite.innerHTML = `<img src="${player.imageurl}" alt="char-image">`; // player image.

    let picture = document.querySelector("#picture");
    picture.innerHTML = `<img src="${enemy.imageurl}" alt="char-image">`; // enemy image.

    console.log(`You are playing as a ${player.id}, HP: ${player.health} DMG: ${player.damage} DEF: ${player.defense}`);

    console.log(`New enemy ${enemy.id} appeared! HP: ${enemy.health} DMG: ${enemy.damage} DEF: ${enemy.defense}`);

// ************************************* Functions *************************************
    
    function newEnemy() { // function used to get a new enemy after defeating one.
        randomNum = Math.round(Math.random() * 4);
        enemy = new Character(json.enemies[randomNum].id, json.enemies[randomNum].health, json.enemies[randomNum].damage, json.enemies[randomNum].defense, json.enemies[randomNum].imageurl, json.enemies[randomNum].whichFunc);

        picture = document.querySelector("#picture");
        picture.innerHTML = `<img src="${enemy.imageurl}" alt="char-image">`;
    }

    function ogreAttack() {
        console.log(`${enemy.id} attacks you...`);
        player.health = player.health - (enemy.damage - player.defense);
        if (player.health >= 1) {
            console.log(`${enemy.id} hits you with his club, dealing ${enemy.damage - player.defense} damage! Your HP: ${player.health}`);
        } else {
            console.log(`${enemy.id}'s final club swing dealt ${enemy.damage - player.defense} damage and defeated you!`);

            gameover.textContent = "GAME OVER!";

            document.querySelector("#turn").classList.add("invisible"); // replace Attack button with Reset.
            document.querySelector("#reset").classList.remove("invisible");
        };
    }

    function skeleAttack() {
        console.log(`${enemy.id} attacks you...`);
        player.health = player.health - (enemy.damage - player.defense);
        if (player.health >= 1) {
            console.log(`${enemy.id} strikes bone against bone, dealing ${enemy.damage - player.defense} damage! Your HP: ${player.health}`);
        } else {
            console.log(`${enemy.id}'s final attack dealt ${enemy.damage - player.defense} damage and defeated you!`);

            gameover.textContent = "GAME OVER!";

            document.querySelector("#turn").classList.add("invisible"); // replace Attack button with Reset.
            document.querySelector("#reset").classList.remove("invisible");
        };
    }

    function wereAttack() {
        console.log(`${enemy.id} attacks you...`);
        player.health = player.health - (enemy.damage - player.defense);
        if (player.health >= 1) {
            console.log(`${enemy.id} slashes you, dealing ${enemy.damage - player.defense} damage! Your HP: ${player.health}`);
        } else {
            console.log(`${enemy.id}'s final slash dealt ${enemy.damage - player.defense} damage and defeated you!`);

            gameover.textContent = "GAME OVER!";

            document.querySelector("#turn").classList.add("invisible"); // replace Attack button with Reset.
            document.querySelector("#reset").classList.remove("invisible");
        };
    }

    function demonAttack() {
        console.log(`${enemy.id} attacks you...`);
        player.health = player.health - (enemy.damage - player.defense);
        if (player.health >= 1) {
            console.log(`${enemy.id} uses black magic, dealing ${enemy.damage - player.defense} damage! Your HP: ${player.health}`);
        } else {
            console.log(`${enemy.id}'s final dark spell dealt ${enemy.damage - player.defense} damage and defeated you!`);

            gameover.textContent = "GAME OVER!";

            document.querySelector("#turn").classList.add("invisible"); // replace Attack button with Reset.
            document.querySelector("#reset").classList.remove("invisible");
        };
    }

    function artoriasAttack() {
        console.log(`${enemy.id} attacks you...`);
        player.health = player.health - (enemy.damage - player.defense);
        if (player.health >= 1) {
            console.log(`${enemy.id} strikes you with his Abyss Greatsword, dealing ${enemy.damage - player.defense} damage! Your HP: ${player.health}`);
        } else {
            console.log(`${enemy.id} swings his Greatsword for the final time dealing ${enemy.damage - player.defense} damage and defeats you!`);

            gameover.textContent = "GAME OVER!";

            document.querySelector("#turn").classList.add("invisible"); // replace Attack button with Reset.
            document.querySelector("#reset").classList.remove("invisible");
        };
    }
    
    function heroAttack() {
        console.log(`You attack the ${enemy.id}...`)
        enemy.health = enemy.health - (player.damage - enemy.defense);
        if (enemy.health >= 1) {
            console.log(`You dealt ${player.damage - enemy.defense} damage! ${enemy.id} HP: ${enemy.health}`);
        } else {
            winCount++;
            console.log(`You dealt ${player.damage - enemy.defense} damage and ${enemy.id} was defeated! Total victories: ${winCount}`);
            player.health = player.health + (Math.round(enemy.damage / 3));
            console.log(`You recovered ${(Math.round(enemy.damage / 3))} health! Your HP: ${player.health}`); // Every enemy defeated gives you some health back.
            if (winCount % 2 == 0) {
                player.health = player.health + 3; // Every two enemies you defeat gives you bonus health.
                console.log(`Your battle experience defeating multiple foes has made you stronger; you gained 3 HP! Your HP: ${player.health}`);
            }
            newEnemy(); // create a new enemy after defeating the previous one.
            console.log(`New enemy ${enemy.id} appeared! HP: ${enemy.health} DMG: ${enemy.damage} DEF: ${enemy.defense}`);
        }
    }

    function heroUltra() {
        console.log(`This is the ultra move!!`);
        enemy.health = enemy.health - player.damage;
        if (enemy.health >= 1) {
            console.log(`You dealt ${player.damage} damage! ${enemy.id} HP: ${enemy.health}`);
        } else {
            winCount++;
            console.log(`Ultra move! ${enemy.id} was defeated! Total victories: ${winCount}`);
            player.health = player.health + (Math.round(enemy.damage / 3));
            console.log(`You recovered ${(Math.round(enemy.damage / 3))} health! Your HP: ${player.health}`); // Every enemy defeated gives you some health back.
            if (winCount % 2 == 0) {
                player.health = player.health + 3; // Every two enemies you defeat gives you bonus health.
                console.log(`Your battle experience defeating multiple foes has made you stronger; you gained 3 HP! Your HP: ${player.health}`);
            }
            newEnemy(); // create a new enemy after defeating the previous one.
            console.log(`New enemy ${enemy.id} appeared! HP: ${enemy.health} DMG: ${enemy.damage} DEF: ${enemy.defense}`);
        }
    }

    let methodArray = [ogreAttack, skeleAttack, wereAttack, demonAttack, artoriasAttack, heroAttack]; // functions to be used by the objects as methods.

    let methodUltraArray = [heroUltra]; // secondary function.

// ************************************* Button functions *************************************

    document.getElementById("turn").addEventListener("click", function takeTurn(){
        player.getMethod(player.whichFunc);
        enemy.getMethod(enemy.whichFunc);
    });

    document.getElementById("ultra").addEventListener("click", function takeTurn(){
        player.getUltra(player.ultra);
        enemy.getMethod(enemy.whichFunc);
    });

})();