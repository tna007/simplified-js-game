let characterList = []; // list
let hero;
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
  console.log(
    playerMovesMap.get(document.getElementById("selectedPlayerName").innerHTML)
  );
  console.log(
    playerMovesMap.get(document.getElementById("selectedEnemyName").innerHTML)
  );
  let playerName = document.getElementById("selectedPlayerName").innerHTML;
  let enemyName = document.getElementById("selectedEnemyName").innerHTML;
  hero = new Player(playerName, playerMovesMap.get(playerName));
  villan = new Player(enemyName, playerMovesMap.get(enemyName));
  console.log(hero);
  console.log(villan);
  hero.attack(villan);
  console.log(villan);
};
const selectCharacterWindow = () => {
  let overlayWindow = document.getElementById("showCharacters");
  overlayWindow.style.visibility = "visible";
  createCharacterGrid();
};
const selectCharacter = (event) => {
  document.getElementById("selectPlayer").style.display = "none";
  document.getElementById("health").style.display = "block";
  let source = event.target || event.srcElement;
  console.log(source);
  let overlayWindow = document.getElementById("showCharacters");
  overlayWindow.style.visibility = "hidden";
  document.getElementById("selectedPlayer").style.visibility = "visible";
  document.getElementById("selectedPlayer").style.content =
    "url(" + source.getAttribute("characterImage") + ")";
  document.getElementById("selectedPlayerName").innerHTML = source.getAttribute(
    "characterName"
  );
  let enemyId = Math.floor(Math.random() * Math.floor(12));
  document.getElementById("selectedEnemy").style.visibility = "visible";
  document.getElementById("selectedEnemy").style.content =
    "url(" + characterList[enemyId].head_shot + ")";
  document.getElementById("selectedEnemyName").innerHTML =
    characterList[enemyId].name;
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
