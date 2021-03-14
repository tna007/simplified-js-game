let characterList =[]
const selectCharacterWindow = () => {
  let overlayWindow = document.getElementById("showCharacters");
  overlayWindow.style.visibility = "visible";
  createCharacterGrid();
};
const selectCharacter =(event)=>{
    let source = event.target || event.srcElement;
    console.log(source);
    let overlayWindow = document.getElementById("showCharacters");
    overlayWindow.style.visibility = "hidden";
    document.getElementById("selectedPlayer").style.visibility = "visible";
    document.getElementById("selectedPlayer").style.content='url('+ source.getAttribute("characterImage")+')'
    let enemyId = Math.floor(Math.random() * Math.floor(characterList.length));
    document.getElementById("selectedEnemy").style.visibility = "visible";
    document.getElementById("selectedEnemy").style.content='url('+ characterList[enemyId].head_shot+')'

}
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
      box.setAttribute("characterName",element.name)
      box.setAttribute("characterImage",element.head_shot)
      box.setAttribute("id",'cell'+index+j)
      box.addEventListener("click",selectCharacter)
      row.appendChild(box);
    }
    document.getElementById("characters").appendChild(row);
  }
};
