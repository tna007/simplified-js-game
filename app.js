const keyAPI = config.KEY;
const baseAPI = config.BASE;
let display = document.getElementById("display");
let attackBtn = document.getElementById("turn");

let enemyCount = 1;
let randomInt = Math.floor(Math.random() * 150);

class Player {
  constructor(name, HP, damage) {
    this.name = name;
    this.HP = HP;
    this.damage = damage;
  }
}
class Enemy {
  constructor(name, HP, damage) {
    this.name = name;
    this.HP = HP;
    this.damage = damage;
  }
}
let player = new Player("Hero", 150, 50, 1);
console.log(player);

(function getEnemy() {
  const url = baseAPI + keyAPI + "/" + randomInt + "/powerstats";
  let enemy;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      let id = data.name;
      let damage = data.power;
      let HP = data.durability;
      //let defense = data.strength;
      enemy = new Enemy(id, HP, damage);
      console.log(enemy);
      getAttack(enemy);
    });
})();

function getAttack(a) {
  a.HP = a.HP - player.damage;
  player.HP = player.HP - a.damage;
  if (player.HP >= 1) {
    console.log(`You took ${a.damage} damage! Your HP: ${player.HP}`);
  } else {
    console.log(`You took ${a.damage} damage and were defeated!`);
    return;
  }
  if (a.HP >= 1) {
    console.log(
      `${a.name} took ${player.damage} damage! ${a.name} HP: ${a.HP}`
    );
    a.HP = getAttack(a.HP);
  } else {
    //if (enemy.HP < 1) {
    console.log(
      `${a.name} took ${player.damage} damage and was defeated! Total victories: ${enemyCount}`
    );
    enemyCount++;
    return;
  }
}

/* if (enemyCount >= 3) {
        enemyDefense = 3;
      }
      enemyHP = 10;
      console.log(
        `A new ${enemy.id} appeared! ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`
      ); */

//else {

/* console.log(
      `${enemy.id} took ${
        player.damage - enemy.defense
      } damage and was defeated! Total victories: ${enemyCount}`
    );
    enemyCount++;
    if (enemyCount >= 3) {
      enemy.defense = 3;
    }
    enemy.health = 10;
    console.log(
      `A new ${enemy.id} appeared! ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`
    );
  }
} */

/*

console.log(
  `You are playing as a ${player.id}, ||HP: ${player.health}|| ||DMG: ${player.damage}|| ||DEF: ${player.defense}||`
);

console.log(
  `Your enemy is a ${enemy.id}, ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`
);

const takeTurn = () => {
  playerAttack();
  enemyAttack();
};

function playerInfo() {
  console.log(
    `You are playing as a ${player.id} ||HP: ${player.health}|| ||DMG: ${player.damage}|| ||DEF: ${player.defense}||`
  );
}

function enemyInfo() {
  console.log(
    `Your enemy is a ${enemy.id} ||HP: ${enemy.health}|| ||DMG: ${enemy.damage}|| ||DEF: ${enemy.defense}||`
  );
} */
