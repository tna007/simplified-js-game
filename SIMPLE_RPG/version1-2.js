// Object Test v1.2
// The initial console.log messages are after the Objects are defined because otherwise it will give an error 'Can not access [X] before intialization. Maybe there is some work-around; maybe it doesn't really matter.
// *****************************************************************************************************************************************************
// Bugs and other stuff we don't want:
// - after player is defeated, clicking "Your info" can show a negative number for HP.
// *****************************************************************************************************************************************************


// -----------------------------------------------------------------------------------------------------------------------------------------------------


// *************************************************** Initializing characters for player and enemies ***************************************************

let enemyCount = 1; // To track victories for example.

let enemy;

class Character {
    constructor(id, health, damage, defense) {
        this.id = id;
        this.health = health;
        this.damage = damage;
        this.defense = defense;
    }
}

function spawnEnemy() {
    let randomNum = Math.random();
    if (randomNum <= 0.4) { // 40% chance to encounter Master Swordsman.
        enemy = new Character ("Master Swordsman", 7, 6, 1);
        Character.prototype.attack = swordsmanStrike; // Adds the specific function as a method for the Character.
    } else {
        enemy = new Character ("Common Knight", 10, 5, 0);
        Character.prototype.attack = knightSlash;
    }
}

let player = {
    id: 'Hero',
    health: 10,
    damage: 5,
    defense: 3,
    attack: function () {
        enemy.health = enemy.health - (this.damage - enemy.defense);
        if (enemy.health >= 1) {
            console.log(`You dealt ${this.damage - enemy.defense} damage! ${enemy.id} HP: ${enemy.health}`);
        } else {
            console.log(`You dealt ${this.damage - enemy.defense} damage and ${enemy.id} was defeated! Total victories: ${enemyCount}`);
            enemyCount++;
            spawnEnemy(); // Creating a new enemy after the previous is defeated.
            console.log(`A new ${enemy.id} appeared! ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`);
        }
    }
}

spawnEnemy(); // Creating the first enemy.

// *************************************************** Beginning console messages ***************************************************

console.log('Object Test v1.2');

console.log(`You are playing as a ${player.id}, ||HP: ${player.health}|| ||DMG: ${player.damage}|| ||DEF: ${player.defense}||`);

console.log(`A new ${enemy.id} appeared! ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`);

// *************************************************** Common Knight methods ***************************************************

function knightSlash () {
    player.health = player.health - (this.damage - player.defense);
    if (player.health >= 1) {
        console.log(`${this.id}'s sword slashes you, dealing ${this.damage - player.defense} damage! Your HP: ${player.health}`);
    } else {
        console.log(`${this.id}'s slash dealt ${this.damage - player.defense} damage and you were defeated!`);
        document.querySelector("#turn").classList.add("invisible"); // Player defeat in this case replaces the Attack button with Reset.
        document.querySelector("#reset").classList.remove("invisible");
    };
}

// *************************************************** Master Swordsman methods ***************************************************

function swordsmanStrike () {
    let randomNum = Math.random();
    if (randomNum <= 0.33) { // 33% chance to deal full damage by defense removal.
        player.health = player.health - this.damage;
        console.log(`GUARD BREAK! ${this.id} expertly removed your defense for a clean hit!`);
        if (player.health >= 1) {
            console.log(`${this.id}'s attack dealt the full ${this.damage} damage! Your HP: ${player.health}`);
        } else {
            console.log(`${this.id}'s strike defeated you, dealing the full ${this.damage} damage!`);
            document.querySelector("#turn").classList.add("invisible");
            document.querySelector("#reset").classList.remove("invisible");
        }
    } else {
        player.health = player.health - (this.damage - player.defense);
        if (player.health >= 1) {
            console.log(`${this.id} attacked you dealing ${this.damage - player.defense} damage! Your HP: ${player.health}`);
        } else {
            console.log(`${this.id} dealt ${this.damage - player.defense} damage and defeated you!`);
            document.querySelector("#turn").classList.add("invisible");
            document.querySelector("#reset").classList.remove("invisible");
        }
    }
}

// *************************************************** Button functions ***************************************************

function takeTurn() {
    player.attack();
    enemy.attack();
}

function playerInfo() {
    console.log(`You are playing as a ${player.id} ||HP: ${player.health}|| ||DMG: ${player.damage}|| ||DEF: ${player.defense}||`);
}

function enemyInfo() {
    console.log(`Your enemy is a ${enemy.id} ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`);
}