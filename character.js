let characterList = []; // list
let hero; //objects
let villan;
let playerMovesMap = new Map(); //it is a Map of character names and their moves
let turn = "player";
playerMovesMap.set("Blackheart", ["hit", "kick"]);
playerMovesMap.set("Cable", ["punch", "kick"]);
playerMovesMap.set("Captain America", ["kick", "stab"]);
playerMovesMap.set("Colossus", ["stab", "punch"]);
playerMovesMap.set("Cyclops", ["punch", "kick"]);
playerMovesMap.set("Doctor Doom", ["stab", "punch"]);
playerMovesMap.set("Gambit", ["hit", "kick"]);
playerMovesMap.set("Hulk", ["kick", "stab"]);
playerMovesMap.set("Ice Man", ["punch", "kick"]);
playerMovesMap.set("Iron Man", ["hit", "kick"]);
playerMovesMap.set("Juggernaut", ["punch", "kick"]);
playerMovesMap.set("Magneto", ["hit", "kick"]);

class Player {
  constructor(name, moves) {
    this.name = name;
    this.moves = moves;
    this.health = 100;
  }

  attack = (opponent) => {
    let moveID = Math.floor(Math.random() * Math.floor(2));
    let selectedMove = this.moves[moveID];
    console.log(
      this.name +
        " is attacking " +
        opponent.name +
        " with the move " +
        selectedMove
    );
    switch (selectedMove) {
      case "hit":
        opponent.health = opponent.health - 10;
        break;
      case "kick":
        opponent.health = opponent.health - 20;
        break;
      case "punch":
        opponent.health = opponent.health - 30;
        break;
      case "stab":
        opponent.health = opponent.health - 40;
        break;

      default:
        break;
    }
  };
}

const attackClickHandler = () => {
  hero.attack(villan);
  document.getElementById("villanHealth").value = villan.health;
  console.log(villan);
  villan.attack(hero);
  document.getElementById("PlayerHealth").value = hero.health;
  console.log(hero);
};
const selectCharacterWindow = () => {
  let overlayWindow = document.getElementById("showCharacters");
  overlayWindow.style.visibility = "visible";
  createCharacterGrid();
};
const selectCharacter = (event) => {
  document.getElementById("selectPlayer").style.display = "none";
  document.getElementById("health").style.display = "flex";
  let source = event.target || event.srcElement;
  console.log(source);
  let overlayWindow = document.getElementById("showCharacters");
  overlayWindow.style.visibility = "hidden";
  document.getElementById("selectedPlayer").style.visibility = "visible";
  document.getElementById("selectedPlayer").style.content =
    "url(" + source.getAttribute("characterImage") + ")";
  const heroName = source.getAttribute("characterName");
  document.getElementById("selectedPlayerName").innerHTML = heroName;
  let enemyId = Math.floor(Math.random() * Math.floor(12));
  document.getElementById("selectedEnemy").style.visibility = "visible";
  document.getElementById("selectedEnemy").style.content =
    "url(" + characterList[enemyId].head_shot + ")";
  const villanName = characterList[enemyId].name;
  document.getElementById("selectedEnemyName").innerHTML = villanName;

  console.log(
    " moves possible for  " + heroName + " " + playerMovesMap.get(heroName)
  );
  let attackResult = document.getElementById("attack");
  let result = document.createElement("p");
  result.innerHTML = `A hero ${heroName} appeared! He can ${playerMovesMap.get(
    heroName
  )}||`;
  attackResult.appendChild(result);
  let result1 = document.createElement("p");
  result1.innerHTML = `A villan ${villanName} appeared! He can ${playerMovesMap.get(
    villanName
  )}||`;
  attackResult.appendChild(result1);

  console.log(
    " moves possible for  " + villanName + " " + playerMovesMap.get(villanName)
  );

  hero = new Player(heroName, playerMovesMap.get(heroName));
  villan = new Player(villanName, playerMovesMap.get(villanName));
  console.log(hero);
  console.log(villan);
};
document.getElementById("selectPlayer").style.display = "block";
document.getElementById("health").style.display = "none";
const fetchCharacters = async () => {
  let url = "https://secure-hamlet-19722.herokuapp.com/api/v1/characters";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
const createCharacterGrid = async () => {
  characterList = await fetchCharacters();

  for (let index = 0; index < 12; index = index + 3) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < 3; j++) {
      const element = characterList[index + j];
      //for creating 3 rows
      let box = document.createElement("div");
      box.className = "box";
      box.style.content = "url(" + element.head_shot + ")";
      box.setAttribute("characterName", element.name);
      console.log(element.name);
      box.setAttribute("characterImage", element.head_shot);
      box.setAttribute("id", "cell" + index + j);
      box.addEventListener("click", selectCharacter);
      row.appendChild(box);
    }
    document.getElementById("characters").appendChild(row);
  }
};
