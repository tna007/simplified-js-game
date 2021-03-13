const keyAPI = config.KEY;
const baseAPI = config.BASE;

let enemyCount = 1;
let randomInt = Math.floor(Math.random() * 732);

(function getEnemy() {
  const url = baseAPI + keyAPI + "/" + randomInt + "/powerstats";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      playerAttack(data);
    });
})();

let player = {
  id: "Hero",
  HP: 10,
  damage: 5,
  defense: 1,
};

function playerAttack(enemy) {
  let enemyName = enemy.name;
  console.log(enemyName);
  if (
    enemy.power != null ||
    enemy.durability != null ||
    enemy.strength != null
  ) {
    let enemyDam = enemy.power;
    console.log("Enemy Dam is", enemyDam);
    let enemyHP = enemy.durability;
    console.log("Enemy Health is", enemyHP);
    let enemyDefense = enemy.strength;
    console.log("Enemy Defense is", enemyDefense);
  }
  //getAttack();
}
/* function getAttack() {
  enemyHP = enemyHP - (player.damage - enemyDefense);
  if (enemyHP >= 1) {
    console.log(
      `${enemyName} took ${
        player.damage - enemyDefense
      } damage! ${enemyName} HP: ${enemyHP}`
    );
  } else {
    console.log(
      `${enemyName} took ${
        player.damage - enemyDefense
      } damage and was defeated! Total victories: ${enemyCount}`
    );
    enemyCount++; */
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
/* let enemy = {
  id: "Monster",
  health: 10,
  damage: 3,
  defense: 0,
};
 */
/* function enemyAttack() {
  player.health = player.health - (enemy.damage - player.defense);
  if (player.health >= 1) {
    console.log(
      `You took ${enemy.damage - player.defense} damage! Your HP: ${
        player.health
      }`
    );
  } else {
    console.log(
      `You took ${enemy.damage - player.defense} damage and were defeated!`
    );
    document.querySelector("#turn").classList.add("invisible");
    document.querySelector("#reset").classList.remove("invisible");
  }
}

console.log("Object Test v1.1");

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
