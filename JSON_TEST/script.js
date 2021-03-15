console.log("Testing fetching and using own JSON data.")

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

    let hero = new Character(json.characters[0].id, json.characters[0].health, json.characters[0].damage, json.characters[0].defense, json.characters[0].imageurl, json.characters[0].whichFunc);

    let villain = new Character(json.characters[1].id, json.characters[1].health, json.characters[1].damage, json.characters[1].defense, json.characters[1].imageurl, json.characters[1].whichFunc);

    function heroAttack() {
        console.log(`Initial Villain HP: ${villain.health}`);
        villain.health = villain.health - (hero.damage - villain.defense);
        console.log(`Dealt ${hero.damage - villain.defense} damage! New Villain HP: ${villain.health}`);
        console.log(villain);
    }
    
    let methodArray = [heroAttack()];

    hero.getMethod(hero.whichFunc);
}

getData();