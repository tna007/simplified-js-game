(async function getData() {
  const TARGET_JSON = "https://public.bc.fi/s2100145/mergeJSONfile/merged.json"; // our own .json file.
  let json = {
    enemies: [
      {
        id: "Ogre",
        health: "7",
        damage: "3",
        defense: "0",
        whichFunc: "0",
        imageurl: "https://public.bc.fi/s2100145/simpleRPGsprites/ogre.png",
      },
      {
        id: "Skeleton",
        health: "5",
        damage: "2",
        defense: "0",
        whichFunc: "1",
        imageurl: "https://public.bc.fi/s2100145/simpleRPGsprites/skeleton.png",
      },
      {
        id: "Werewolf",
        health: "9",
        damage: "4",
        defense: "1",
        whichFunc: "2",
        imageurl: "https://public.bc.fi/s2100145/simpleRPGsprites/werewolf.png",
      },
      {
        id: "Demon",
        health: "8",
        damage: "4",
        defense: "0",
        whichFunc: "3",
        imageurl: "https://public.bc.fi/s2100145/simpleRPGsprites/demon.png",
      },
      {
        id: "Knight Artorias",
        health: "11",
        damage: "5",
        defense: "2",
        whichFunc: "4",
        imageurl: "https://public.bc.fi/s2100145/simpleRPGsprites/artorias.png",
      },
    ],
  };

  console.log(json);
  //JSON.parse(merg)//await fetch(`${TARGET_JSON}`);
  // let json = await response.json();
  console.log("Object Test v1.5");

  let randomNum = Math.round(Math.random() * 4); // random number to specify enemy type.

  class Character {
      constructor(id, health, damage, defense, imageurl, whichFunc, ultra) {
          this.id = id;
          this.health = health;
          this.damage = damage;
          this.defense = defense;
          this.imageurl = imageurl;
          this.whichFunc = whichFunc; // variable that is passed into getMethod to acquire correct function from methodArray.
          this.ultra = ultra; // secondary function for the player.
      }
      getMethod(x) {
          methodArray[x](); // when a Character class object calls getMethod, it will execute a function from methodArray based on the parameter that is passed.
      }
      getUltra(x) {
          methodUltraArray[x]();
      }
  }

  let player = new Character("Hero", 10, 6, 1, "https://public.bc.fi/s2100145/simpleRPGsprites/hao-qin-csu26Tj-8bQ-unsplash_2.jpg", 5, 0);

  let enemy = new Character(json.enemies[randomNum].id, json.enemies[randomNum].health, json.enemies[randomNum].damage, json.enemies[randomNum].defense, json.enemies[randomNum].imageurl, json.enemies[randomNum].whichFunc); // first enemy created.

// *********** Sounds and general declarations ***********

  function sound(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function(){
      this.sound.play();
      }
      this.stop = function(){
      this.sound.pause();
      }
  }

  let winCount = 0;

  let result = document.querySelector("#result");

  let gameover = document.querySelector("#gameover");

  let background = new sound("background.wav");
  document.body.addEventListener("mousemove", function () { // to prevent Chrome from muting the initial playthrough's background sounds.
      background.play();
  });

// *********** UI images and names ***********

  let sprite = document.querySelector("#sprite");
  let img = document.createElement("img");
  img.setAttribute("src", player.imageurl); // player image.
  img.setAttribute("alt", "char-image");
  sprite.appendChild(img);

  let playerName = document.getElementById("selectedPlayerName");
  playerName.innerHTML = player.id; // displays "Hero" above image.

  let picture = document.querySelector("#picture");
  let img1 = document.createElement("img");
  img1.setAttribute("src", enemy.imageurl); // enemy image.
  img1.setAttribute("alt", "char-image");
  picture.appendChild(img1);

  let enemyName = document.getElementById("selectedEnemyName");
  enemyName.innerHTML = enemy.id; // displays enemy id above image.

// *********** Initial text console messages ***********

  let attackResult = document.getElementById("displayBox"); // the text console in the UI.
  let display = document.createElement("p");
  display.innerHTML = `You are playing as a ${player.id}, HP: ${player.health} DMG: ${player.damage} DEF: ${player.defense}`;
  attackResult.appendChild(display);
  console.log(`You are playing as a ${player.id}, HP: ${player.health} DMG: ${player.damage} DEF: ${player.defense}`);

  let result1 = document.createElement("p");
  result1.innerHTML = `New enemy ${enemy.id} appeared! HP: ${enemy.health} DMG: ${enemy.damage} DEF: ${enemy.defense}`;
  attackResult.appendChild(result1);
  console.log(`New enemy ${enemy.id} appeared! HP: ${enemy.health} DMG: ${enemy.damage} DEF: ${enemy.defense}`);

// *********** Functions ***********
  
  function newEnemy() { // function used to get a new enemy after defeating one.
      randomNum = Math.round(Math.random() * 4);
      enemy = new Character(json.enemies[randomNum].id, json.enemies[randomNum].health, json.enemies[randomNum].damage, json.enemies[randomNum].defense, json.enemies[randomNum].imageurl, json.enemies[randomNum].whichFunc);

      let result1 = document.createElement("p");
      result1.innerHTML = `New enemy ${enemy.id} appeared! HP: ${enemy.health} DMG: ${enemy.damage} DEF: ${enemy.defense}`;
      attackResult.appendChild(result1);
      console.log(`New enemy ${enemy.id} appeared! HP: ${enemy.health} DMG: ${enemy.damage} DEF: ${enemy.defense}`);

      picture = document.querySelector("#picture");
      picture.innerHTML = `<img src="${enemy.imageurl}" alt="char-image">`;
  }

  function attackLog(attackerName,playerLog) { // for displaying a turn's attack information.
      let attackResult = document.getElementById("displayBox");
  
      let display = document.createElement("p");
      display.innerHTML = attackerName;
      attackResult.appendChild(display);
  
      let display1 = document.createElement("p");
      display1.innerHTML = playerLog;
      attackResult.appendChild(display1);
      
  }
  
  function updateHealth(heroHealth,enemyHealth){ // updates the healthbar.
      document.getElementById("PlayerHealth").value=heroHealth;
      document.getElementById("villanHealth").value=enemyHealth;
  }

  function knightAttack() {
      let playerLog;

      const attackerName = `${enemy.id} engages you...`;
      console.log(attackerName);
      player.health = player.health - (enemy.damage - player.defense);

      if (player.health >= 1) {

          playerLog = `${enemy.id} hits you with his sword, dealing ${enemy.damage - player.defense} damage! Your HP: ${player.health}`;
          console.log(playerLog);

      } else {

          let gameOverSound = new sound("gameOver.wav");
          gameOverSound.play();

          finalblow.textContent = `${enemy.id}'s sword swing dealt ${enemy.damage - player.defense} damage and defeated you!`; // shown on game over splash screen.
          console.log(`${enemy.id}'s sword swing dealt ${enemy.damage - player.defense} damage and defeated you!`);

          result.style.visibility = "visible"; // displays the game over splash screen.
          gameover.textContent = "GAME OVER!";

      }

      attackLog(attackerName,playerLog);
      updateHealth(player.health,enemy.health);
      document.getElementById("enemyHealthCount").innerHTML=enemy.health; // updates HP number below the healthbar.
      document.getElementById("playerHealthCount").innerHTML=player.health;

  }

  function skeleAttack() {

      let playerLog;

      const attackerName = `${enemy.id} attacks you...`;
      console.log(attackerName);
      player.health = player.health - (enemy.damage - player.defense);

      if (player.health >= 1) {

          playerLog = `${enemy.id} strikes bone against bone, dealing ${enemy.damage - player.defense} damage! Your HP: ${player.health}`;
          console.log(playerLog);

      } else {

          let gameOverSound = new sound("gameOver.wav");
          gameOverSound.play();

          finalblow.textContent = `${enemy.id}'s attack dealt ${enemy.damage - player.defense} damage and defeated you!`;
          console.log(`${enemy.id}'s attack dealt ${enemy.damage - player.defense} damage and defeated you!`);

          result.style.visibility = "visible";
          gameover.textContent = "GAME OVER!";

      }

      attackLog(attackerName,playerLog);
      updateHealth(player.health,enemy.health);
      document.getElementById("enemyHealthCount").innerHTML=enemy.health;
      document.getElementById("playerHealthCount").innerHTML=player.health;

  }

  function wereAttack() {

      let playerLog;

      const attackerName = `${enemy.id} takes a swing at you...`;
      console.log(attackerName);
      player.health = player.health - (enemy.damage - player.defense);

      if (player.health >= 1) {

          playerLog = `${enemy.id} slashes you, dealing ${enemy.damage - player.defense} damage! Your HP: ${player.health}`;
          console.log(playerLog);

      } else {

          let gameOverSound = new sound("gameOver.wav");
          gameOverSound.play();

          finalblow.textContent = `${enemy.id}'s slash dealt ${enemy.damage - player.defense} damage and defeated you!`;
          console.log(`${enemy.id}'s slash dealt ${enemy.damage - player.defense} damage and defeated you!`);

          result.style.visibility = "visible";
          gameover.textContent = "GAME OVER!";

      }

      attackLog(attackerName,playerLog);
      updateHealth(player.health,enemy.health);
      document.getElementById("enemyHealthCount").innerHTML=enemy.health;
      document.getElementById("playerHealthCount").innerHTML=player.health;

  }

  function demonAttack() {

      const attackerName = `${enemy.id} attacks you...`;
      console.log(attackerName);

      let randomNum = Math.random();
      if (randomNum <= 0.20) { // 20 % chance to use dark curse.

          player.health = Math.ceil(player.health / 2); // Dark curse halves current HP.
          playerLog = `CURSED! ${enemy.id}'s dark spell removed half of your health! Your HP: ${player.health}`;
          console.log(playerLog);

      } else {

          player.health = player.health - (enemy.damage - player.defense);

          if (player.health >= 1) {

              playerLog = `${enemy.id} uses black magic, dealing ${enemy.damage - player.defense} damage! Your HP: ${player.health}`;
              console.log(playerLog);

          } else {

              let gameOverSound = new sound("gameOver.wav");
              gameOverSound.play();

              finalblow.textContent = `${enemy.id}'s dark spell dealt ${enemy.damage - player.defense} damage and defeated you!`;
              console.log(`${enemy.id}'s dark spell dealt ${enemy.damage - player.defense} damage and defeated you!`);

              result.style.visibility = "visible";
              gameover.textContent = "GAME OVER!";

          }

      }

      attackLog(attackerName,playerLog);
      updateHealth(player.health,enemy.health);
      document.getElementById("enemyHealthCount").innerHTML=enemy.health;
      document.getElementById("playerHealthCount").innerHTML=player.health;

  }

  function swordsmanStrike() {

      const attackerName = `${enemy.id} attacks you...`;
      console.log(attackerName);

      let randomNum = Math.random();
      if (randomNum <= 0.33) { // 33% chance to deal full damage by defense removal.

          player.health = player.health - enemy.damage;

          if (player.health >= 1) {

              playerLog = `GUARD BREAK! ${enemy.id} removed your defenses and dealt the full ${enemy.damage} damage! Your HP: ${player.health}`;
              console.log(playerLog);

          } else {

              let gameOverSound = new sound("gameOver.wav");
              gameOverSound.play();

              finalblow.textContent = `GUARD BREAK! ${enemy.id}'s defense-removing strike defeated you!`;
              console.log(`GUARD BREAK! ${enemy.id}'s defense-removing strike defeated you!`);

              result.style.visibility = "visible";
              gameover.textContent = "GAME OVER!";

          }

      } else {

          player.health = player.health - (enemy.damage - player.defense);

          if (player.health >= 1) {

          playerLog = `${enemy.id} attacked you dealing ${enemy.damage - player.defense} damage! Your HP: ${player.health}`;
          console.log(playerLog);

          } else {

              let gameOverSound = new sound("gameOver.wav");
              gameOverSound.play();

              finalblow.textContent = `${enemy.id} dealt ${enemy.damage - player.defense} damage and defeated you!`;
              console.log(`${enemy.id} dealt ${enemy.damage - player.defense} damage and defeated you!`);

              result.style.visibility = "visible";
              gameover.textContent = "GAME OVER!";

          }

      }
          
      attackLog(attackerName,playerLog);
      updateHealth(player.health,enemy.health);
      document.getElementById("enemyHealthCount").innerHTML=enemy.health;
      document.getElementById("playerHealthCount").innerHTML=player.health;

  }
  
  function heroAttack() { // the primary attack 'Slash' for the player.

      let slashNoise = new sound("atack.wav");
      slashNoise.play();
      
      const attackerName = `You swing your sword...`;
      console.log(attackerName);

      enemy.health = enemy.health - (player.damage - enemy.defense);

      if (enemy.health >= 1) {

          playerLog = `You dealt ${player.damage - enemy.defense} damage! ${enemy.id} HP: ${enemy.health}`;
          console.log(playerLog);

      } else {

          winCount++;
          playerLog = `You dealt ${player.damage - enemy.defense} damage and ${enemy.id} was defeated! Total victories: ${winCount}`;
          console.log(playerLog);

          player.health = player.health + (Math.round(enemy.damage / 3)); // Every enemy defeated gives you some health back.
          let bonusHealth = document.createElement("p");
          bonusHealth.innerHTML = `You recovered ${(Math.round(enemy.damage / 3))} health! Your HP: ${player.health}`;
          attackResult.appendChild(bonusHealth);
          console.log(`You recovered ${(Math.round(enemy.damage / 3))} health! Your HP: ${player.health}`);

          if (winCount % 2 == 0) {

              player.health = player.health + 3; // Every two enemies you defeat gives you bonus health.
              let levelUp = document.createElement("p");
              levelUp.innerHTML = `Your battle experience defeating multiple foes has made you stronger; you gained 3 HP! Your HP: ${player.health}`;
              attackResult.appendChild(levelUp);
              console.log(`Your battle experience defeating multiple foes has made you stronger; you gained 3 HP! Your HP: ${player.health}`);

          }

          newEnemy(); // create a new enemy after defeating the previous one.

      }

      attackLog(attackerName,playerLog);
      document.getElementById("enemyHealthCount").innerHTML=enemy.health;
      document.getElementById("playerHealthCount").innerHTML=player.health;

  }

  function heroUltra() { // the secondary attack 'Pierce' for the player.

      let ultraNoise = new sound("ultra.wav");
      ultraNoise.play();

      const attackerName = `You attempt a piercing strike...`;
      console.log(attackerName);

      let randomNum = Math.random();
      if (randomNum <= 0.5) { // 50 % chance to fail.

          playerLog = `Your attack failed! No damage was dealt.`;
          console.log(playerLog);

      } else { // 50 % chance to deal damage without enemy's defense reducing it.

          enemy.health = enemy.health - player.damage;

          if (enemy.health >= 1) {

              playerLog = `You pierced the enemy's defense and dealt the full ${player.damage} damage! ${enemy.id} HP: ${enemy.health}`;
              console.log(playerLog);

          } else {

              winCount++;
              playerLog = `Your piercing attack successfully defeated ${enemy.id}! Total victories: ${winCount}`;
              console.log(playerLog);

              player.health = player.health + (Math.round(enemy.damage / 3));
              let bonusHealth = document.createElement("p");
              bonusHealth.innerHTML = `You recovered ${(Math.round(enemy.damage / 3))} health! Your HP: ${player.health}`;
              attackResult.appendChild(bonusHealth);
              console.log(`You recovered ${(Math.round(enemy.damage / 3))} health! Your HP: ${player.health}`);

              if (winCount % 2 == 0) {

                  player.health = player.health + 3;
                  let levelUp = document.createElement("p");
                  levelUp.innerHTML = `Your battle experience defeating multiple foes has made you stronger; you gained 3 HP! Your HP: ${player.health}`;
                  attackResult.appendChild(levelUp);
                  console.log(`Your battle experience defeating multiple foes has made you stronger; you gained 3 HP! Your HP: ${player.health}`);

              }

              newEnemy();

          }

      }

      attackLog(attackerName,playerLog);
      document.getElementById("enemyHealthCount").innerHTML=enemy.health;
      document.getElementById("playerHealthCount").innerHTML=player.health;

  }

  let methodArray = [knightAttack, skeleAttack, wereAttack, demonAttack, swordsmanStrike, heroAttack]; // functions to be used by the objects as methods.

  let methodUltraArray = [heroUltra]; // secondary function for the player.

// ************************************* Button functions *************************************

  document.getElementById("turn").addEventListener("click", function takeTurn(){ // 'Slash' button functionality.
      player.getMethod(player.whichFunc);
      enemy.getMethod(enemy.whichFunc);
  });

  document.getElementById("ultra").addEventListener("click", function takeTurn(){ // 'Pierce' button functionality.
      player.getUltra(player.ultra);
      enemy.getMethod(enemy.whichFunc);
  });

})();

let close = document.querySelector("#close"); // the 'Close' button for the game over splash screen.