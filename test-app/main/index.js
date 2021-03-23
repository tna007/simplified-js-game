(async function getData() {
  const TARGET_JSON =
    "https://raw.githubusercontent.com/tna007/simplified-js-game/main/test-app/main/test.json"; // our own .json file.

  let response = await fetch(`${TARGET_JSON}`);
  let json = await response.json();
  console.log("Object Test v1.5");

  let randNum = Math.round(Math.random() * 3); // random number to specify enemy type.
  let randNum2 = Math.round(Math.random() * 1); // random number to specify enemy type.

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
    getEnemyAttack(x) {
      methodArray[x](); // when a Character class object calls getMethod, it will execute a function from methodArray based on the parameter that is passed.
    }
    getHeroAttack(b) {
      methodHerroArray[b]();
    }
    getUltra(a) {
      methodUltra[a]();
    }
  }

  let player = new Character(
    json.hero[randNum2].id,
    json.hero[randNum2].health,
    json.hero[randNum2].damage,
    json.hero[randNum2].defense,
    json.hero[randNum2].imageurl,
    json.hero[randNum2].whichFunc,
    json.hero[randNum2].ultra
  ); // note: whichFunc, the last value, will need to be changed depending on which index in methodArray the player's attack function is.

  let enemy = new Character(
    json.enemies[randNum].id,
    json.enemies[randNum].health,
    json.enemies[randNum].damage,
    json.enemies[randNum].defense,
    json.enemies[randNum].imageurl,
    json.enemies[randNum].whichFunc
  ); // first enemy created.

  // ************************************* UI & Images *************************************

  let sprite = document.querySelector("#sprite");
  let img = document.createElement("img");
  img.setAttribute("src", player.imageurl); // player image.
  img.setAttribute("alt", "char-image");
  sprite.appendChild(img);

  let playerName = document.getElementById("selectedPlayerName");
  playerName.textContent = player.id; // displays "Hero" above image.

  let picture = document.querySelector("#picture");
  let img1 = document.createElement("img");
  img1.setAttribute("src", enemy.imageurl); // enemy image.
  img1.setAttribute("alt", "char-image");
  picture.appendChild(img1);

  let enemyName = document.getElementById("selectedEnemyName");
  enemyName.textContent = enemy.id; // displays enemy id above image.

  // *********** Initial text console messages ***********

  let attackResult = document.getElementById("displayBox"); // the text console in the UI.
  let display = document.createElement("p");
  display.textContent = `You are playing as a ${player.id}, HP: ${player.health} DMG: ${player.damage} DEF: ${player.defense}`;
  attackResult.appendChild(display);
  console.log(
    `You are playing as a ${player.id}, HP: ${player.health} DMG: ${player.damage} DEF: ${player.defense}`
  );

  let result1 = document.createElement("p");
  result1.textContent = `New enemy ${enemy.id} appeared! HP: ${enemy.health} DMG: ${enemy.damage} DEF: ${enemy.defense}`;
  attackResult.appendChild(result1);
  console.log(
    `New enemy ${enemy.id} appeared! HP: ${enemy.health} DMG: ${enemy.damage} DEF: ${enemy.defense}`
  );

  // ************************************* Functions *************************************

  function newEnemy() {
    // function used to get a new enemy after defeating one.
    randomNum = Math.round(Math.random() * 4);
    enemy = new Character(
      json.enemies[randomNum].id,
      json.enemies[randomNum].health,
      json.enemies[randomNum].damage,
      json.enemies[randomNum].defense,
      json.enemies[randomNum].imageurl,
      json.enemies[randomNum].whichFunc
    );

    let result1 = document.createElement("p");
    result1.textContent = `New enemy ${enemy.id} appeared! HP: ${enemy.health} DMG: ${enemy.damage} DEF: ${enemy.defense}`;
    attackResult.appendChild(result1);
    console.log(
      `New enemy ${enemy.id} appeared! HP: ${enemy.health} DMG: ${enemy.damage} DEF: ${enemy.defense}`
    );

    picture = document.querySelector("#picture");
    picture.innerHTML = `<div class="label" id="selectedEnemyName">${enemy.id}</div>
    <img src="${enemy.imageurl}" alt="char-image">`;
  }

  function attackLog(attackerName, playerLog) {
    // for displaying a turn's attack information.
    let attackResult = document.getElementById("displayBox");

    let display = document.createElement("p");
    display.textContent = attackerName;
    attackResult.appendChild(display);

    let display1 = document.createElement("p");
    display1.textContent = playerLog;
    attackResult.appendChild(display1);
  }

  function updateHealth(heroHealth, enemyHealth) {
    // updates the healthbar.
    document.getElementById("PlayerHealth").value = heroHealth;
    document.getElementById("villanHealth").value = enemyHealth;
  }

  function enemyAttack() {
    let playerLog;
    const attackerName = `${enemy.id} engages you...`;
    console.log(attackerName);
    player.health = player.health - (enemy.damage - player.defense);
    if (player.health >= 1) {
      enemy.whichFunc == 0
        ? (playerLog = `${enemy.id} hits you with his sword, dealing ${
            enemy.damage - player.defense
          } damage! Your HP: ${player.health}`)
        : enemy.whichFunc == 1
        ? (playerLog = `${enemy.id} strikes bone against bone, dealing ${
            enemy.damage - player.defense
          } damage! Your HP: ${player.health}`)
        : enemy.whichFunc == 2
        ? (playerLog = `${enemy.id} slashes you, dealing ${
            enemy.damage - player.defense
          } damage! Your HP: ${player.health}`)
        : (playerLog = `${
            enemy.id
          } strikes you with his Abyss Greatsword, dealing ${
            enemy.damage - player.defense
          } damage! Your HP: ${player.health}`);
    } else {
      enemy.whichFunc == 0
        ? (playerLog = `${enemy.id}'s final club swing dealt ${
            enemy.damage - player.defense
          } damage and defeated you!`)
        : enemy.whichFunc == 1
        ? (playerLog = `${enemy.id}'s final attack dealt ${
            enemy.damage - player.defense
          } damage and defeated you!`)
        : enemy.whichFunc == 2
        ? (playerLog = `${enemy.id} slashes you, dealing ${
            enemy.damage - player.defense
          } damage! Your HP: ${player.health}`)
        : (playerLog = `${
            enemy.id
          } swings his Greatsword for the final time dealing ${
            enemy.damage - player.defense
          } damage and defeats you!`);

      gameover.textContent = "GAME OVER!";
      result.style.visibility = "visible";
      let finalBlow = document.querySelector("#finalBlow");
      finalBlow.textContent = `${enemy.id}'s sword swing dealt ${
        enemy.damage - player.defense
      } damage and defeated you!`; // shown on game over splash screen.
      console.log(
        `${enemy.id}'s sword swing dealt ${
          enemy.damage - player.defense
        } damage and defeated you!`
      );

      /* document.querySelector("#attack").classList.add("invisible"); // replace Attack button with Reset.
      document.querySelector("#ultra").classList.add("invisible");
      document.querySelector("#reset").classList.remove("invisible"); */
    }
    attackLog(attackerName, playerLog);
    updateHealth(player.health, enemy.health);

    document.getElementById("enemyHealthCount").textContent = enemy.health;
    document.getElementById("playerHealthCount").textContent = player.health;
  }
  function ogreAttack() {
    enemyAttack();
  }

  function skeleAttack() {
    enemyAttack();
  }

  function wereAttack() {
    enemyAttack();
  }

  function demonAttack() {
    enemyAttack();
  }

  function artoriasAttack() {
    enemyAttack();
  }

  function normHeroAttack() {
    if (enemy.health >= 1) {
      console.log(
        `You dealt ${player.damage - enemy.defense} damage! ${enemy.id} HP: ${
          enemy.health
        }`
      );
    } else {
      winCount++;
      console.log(
        `You dealt ${player.damage - enemy.defense} damage and ${
          enemy.id
        } was defeated! Total victories: ${winCount}`
      );
      player.health = Number(player.health);
      player.health = player.health + Math.round(enemy.damage / 3);
      console.log(
        `You recovered ${Math.round(enemy.damage / 3)} health! Your HP: ${
          player.health
        }`
      ); // Every enemy defeated gives you some health back.

      if (winCount % 2 == 0) {
        player.health = player.health + 3; // Every two enemies you defeat gives you bonus health.
        console.log(
          `Your battle experience defeating multiple foes has made you stronger; you gained 3 HP! Your HP: ${player.health}`
        );
      }
      newEnemy(); // create a new enemy after defeating the previous one.
      console.log(
        `New enemy ${enemy.id} appeared! HP: ${enemy.health} DMG: ${enemy.damage} DEF: ${enemy.defense}`
      );
    }
    document.getElementById("enemyHealthCount").textContent =
      enemy.health + " HP";
    document.getElementById("playerHealthCount").textContent =
      player.health + " HP";
  }

  function heroAttack() {
    const attackerName = `You attack the ${enemy.id}...`;
    console.log(attackerName);
    enemy.health = enemy.health - (player.damage - enemy.defense);
    normHeroAttack();
  }

  function heroUltra() {
    const attackerName = `You attack the ${enemy.id}...This is the ultra move!!`;
    console.log(attackerName);
    enemy.health = enemy.health - player.damage;
    normHeroAttack();
  }

  let methodArray = [
    ogreAttack,
    skeleAttack,
    wereAttack,
    demonAttack,
    artoriasAttack,
  ]; // functions to be used by the objects as methods.
  let methodHerroArray = [heroAttack];
  let methodUltra = [heroUltra]; // secondary function.

  // ************************************* Button functions *************************************

  document
    .getElementById("attack")
    .addEventListener("click", function takeTurn() {
      player.getHeroAttack(player.whichFunc);
      enemy.getEnemyAttack(enemy.whichFunc);
    });

  document
    .getElementById("ultra")
    .addEventListener("click", function takeTurn() {
      player.getUltra(player.ultra);
      enemy.getEnemyAttack(enemy.whichFunc);
    });
})();
