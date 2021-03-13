// Object Test v1.2
// The initial console.log messages are after the Objects are defined because otherwise it will give an error 'Can not access [X] before intialization. Maybe there is some work-around; maybe it doesn't really matter.
// *****************************************************************************************************************************************************
// Bugs and other stuff we don't want:
// - after player is defeated, clicking "Your info" can show a negative number for HP.
// *****************************************************************************************************************************************************
let enemyCount = 1;

let primaryTest;
let enemy;

function spawnEnemy() {
    let randomNum = Math.random();
    if (randomNum <= 0.4) {
        enemy = new Character ("Master Swordsman", 6, 6, 0);
        primaryTest = masterAttack;
    } else {
        enemy = new Character ("Kakuna", 10, 0, 1);
        primaryTest = kakunaDefend;
    }
}

class Character {
    constructor(id, health, damage, defense) {
        this.id = id;
        this.health = health;
        this.damage = damage;
        this.defense = defense;
    }
    primaryMove () {
        window["primaryTest"]();
    }
}

let player = {
    id: 'Hero',
    health: 10,
    damage: 5,
    defense: 1,
    attack: function () {
        enemy.health = enemy.health - (this.damage - enemy.defense);
        if (enemy.health >= 1) {
            console.log(`${enemy.id} took ${this.damage - enemy.defense} damage! ${enemy.id} HP: ${enemy.health}`);
        } else {
            console.log(`${enemy.id} took ${this.damage - enemy.defense} damage and was defeated! Total victories: ${enemyCount}`);
            enemyCount++;
            spawnEnemy();
            console.log(`A new ${enemy.id} appeared! ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`);
        }
    }
}

spawnEnemy();

console.log('Object Test v1.2');

console.log(`You are playing as a ${player.id}, ||HP: ${player.health}|| ||DMG: ${player.damage}|| ||DEF: ${player.defense}||`);

console.log(`Your enemy is a ${enemy.id}, ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`);

function kakunaDefend () {
    this.defense++;
    console.log(`${this.id}'s defense increased! ${this.id} DEF: ${this.defense}`);
}

function masterAttack () {
    let randomNum = Math.random();
    if (randomNum <= 0.33) {
        player.health = player.health - this.damage;
        console.log(`GUARD BREAK! ${this.id} expertly removed your defenses for a clean hit!`);
    } else {
        player.health = player.health - (this.damage - player.defense);
    }
    console.log(`You took ${this.damage} damage! Your HP: ${player.health}`);
}

function takeTurn() {
    player.attack();
    enemy.primaryMove();
}

function playerInfo() {
    console.log(`You are playing as a ${player.id} ||HP: ${player.health}|| ||DMG: ${player.damage}|| ||DEF: ${player.defense}||`);
}

function enemyInfo() {
    console.log(`Your enemy is a ${enemy.id} ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`);
}