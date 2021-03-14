// Object Test v1.1
// The initial console.log messages are after the Objects are defined because otherwise it will give an error 'Can not access [X] before intialization. Maybe there is some work-around; maybe it doesn't really matter.
// *****************************************************************************************************************************************************
// Bugs and other stuff we don't want:
// - after player is defeated, clicking "Your info" can show a negative number for HP.
// *****************************************************************************************************************************************************
let enemyCount = 1;

/**class Player {
  constructor(id, health, damage, defense) {
    this.id = id;
    this.health = health;
    this.damage = damage;
    this.defense = defense;
  }
  attack (otherPlayer) {
  }
};
let player1 = new Player("Hero",10,5,1)
let player2 = new Player("Monster",10,3,0)**/



let player = {
  id: "Hero",
  health: 10,
  damage: 5,
  defense: 1,
  attack: function () {
    enemy.health = enemy.health - (this.damage - enemy.defense);
    if (enemy.health >= 1) {
      console.log(
        `${enemy.id} took ${this.damage - enemy.defense} damage! ${
          enemy.id
        } HP: ${enemy.health}`
      );
      let attackResult=document.getElementById("attack");
      let result = document.createElement("Label");
      result.innerHTML =  `${enemy.id} took ${this.damage - enemy.defense} damage! ${
        enemy.id
      } HP: ${enemy.health}`;
      attackResult.appendChild(result);
    } else {
      console.log(
        `${enemy.id} took ${
          this.damage - enemy.defense
        } damage and was defeated! Total victories: ${enemyCount}`
      );
      let attackResult=document.getElementById("attack");
      let result = document.createElement("Label");
      result.innerHTML =    `${enemy.id} took ${
        this.damage - enemy.defense
      } damage and was defeated! Total victories: ${enemyCount}`;
      attackResult.appendChild(result);

      enemyCount++;
      if (enemyCount >= 3) {
        enemy.defense = 3;
      }
      enemy.health = 10;
      console.log(
        `A new ${enemy.id} appeared! ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`
      );
    }
    let attackResult=document.getElementById("attack");
    let result = document.createElement("Label");
    result.innerHTML = `A new ${enemy.id} appeared! ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`;
    attackResult.appendChild(result);
  },
};

let enemy = {
  id: "Monster",
  health: 10,
  damage: 3,
  defense: 0,
  attack: function () {
    player.health = player.health - (this.damage - player.defense);
    if (player.health >= 1) {
      console.log(
        `You took ${this.damage - player.defense} damage! Your HP: ${
          player.health
        }`
      );
    } else {
      console.log(
        `You took ${this.damage - player.defense} damage and were defeated!`
      );

      document.querySelector("#turn").classList.add("invisible");
      document.querySelector("#reset").classList.remove("invisible");
    }
  },
};

console.log("Object Test v1.1");

console.log(
  `You are playing as a ${player.id}, ||HP: ${player.health}|| ||DMG: ${player.damage}|| ||DEF: ${player.defense}||`
);

console.log(
  `Your enemy is a ${enemy.id}, ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`
);

function takeTurn() {
  player.attack();
  enemy.attack();
}

function playerInfo() {
    let player1Info=document.getElementById("player1");
    let player1 = document.createElement("Label");
    player1.innerHTML = `You are playing as a ${player.id} ||HP: ${player.health}|| ||DMG: ${player.damage}|| ||DEF: ${player.defense}||`;
    player1Info.appendChild(player1);
  console.log(
    `You are playing as a ${player.id} ||HP: ${player.health}|| ||DMG: ${player.damage}|| ||DEF: ${player.defense}||`
  );
}

function enemyInfo() {
    let player2Info=document.getElementById("player2");
    let player2 = document.createElement("Label");
    player2.innerHTML =  `Your enemy is a ${enemy.id} ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`;
    player2Info.appendChild(player2);
  console.log(
    `Your enemy is a ${enemy.id} ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`
  );
}
