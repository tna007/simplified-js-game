console.log("Testing fetching and using own JSON data.");

const TARGET_JSON = "https://public.bc.fi/s2100145/JSON-file/json.json";

let randomNum = Math.round(Math.random());

async function getData() {
    class Character {
        constructor(id, health, damage, defense, imageurl, whichFunc) {
            this.id = id;
            this.health = health;
            this.damage = damage;
            this.defense = defense;
            this.imageurl = imageurl;
            this.whichFunc = whichFunc;
        }
        getMethod(i) {
            methodArray[i];
        }
    }

    let response = await fetch(`${TARGET_JSON}`);
    let json = await response.json();
    console.log(json);

    let targetCharacter = new Character("Target", 100, 100, 0, "no-image", "no-value");

    let randomCharacter = new Character(json.characters[randomNum].id, json.characters[randomNum].health, json.characters[randomNum].damage, json.characters[randomNum].defense, json.characters[randomNum].imageurl, json.characters[randomNum].whichFunc);

    function randomCharAttack() {
        console.log(`Initial Target HP: ${targetCharacter.health}`);
        targetCharacter.health = targetCharacter.health - (randomCharacter.damage - targetCharacter.defense);
        console.log(`Dealt ${randomCharacter.damage - targetCharacter.defense} damage! New Target HP: ${targetCharacter.health}`);
        console.log(targetCharacter);
    }
    
    let methodArray = [randomCharAttack()];

    randomCharacter.getMethod(randomCharacter.whichFunc);
}

getData();