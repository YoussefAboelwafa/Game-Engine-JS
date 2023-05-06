import {GameEngine} from '../GameEngine.js';
export class Suduko extends GameEngine{
constructor() {
    super()
  }

 
controller(input,state){
  console.log(input);
  if(input==null || input[1]==""){
    state[2]=false;
    return state;
  }
  
  if(!(input[1]>=0&&input[1]<10)){
    state[2]=false;
    return state;
  }

  let row=Math.floor(input[0]/9);
  let col=input[0]%9;
  if(input[1]==0 && state[1][row][col]=="-"){
    state[0][row][col]="-";
    state[2]=true;
    return state;
  }
  
  if(state[1][row][col]!="-"){
    state[2]=false;
    return state;
  }
  
  let boxRow = Math.floor(row / 3);
  let boxCol = Math.floor(col / 3);
  for (let i = boxRow * 3; i < boxRow * 3 + 3; i++) {
    for (let j = boxCol * 3; j < boxCol * 3 + 3; j++) {
      if (input[1] == state[0][i][j]) {
        state[2]=false;
        return state;
      }
    }
  }
  
  for(let i=0;i<9;i++){
    if(state[0][row][i]==input[1]||state[0][i][col]==input[1]){
      state[2]=false;
      return state; 
    }
  }

  state[0][row][col]=input[1];
  state[2]=true;
  return state;

}

drawer(state) {
    let id=0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const elem = document.getElementById(id);
        if (state[0][i][j] != "-") {
          elem.textContent = state[0][i][j];
        } else {
          elem.textContent = " ";
          elem.style.backgroundColor = "yellow";
        }
        id++;
      }
    }
  }

initialize(){
  const grid = Array.from(Array(9), () => new Array(9).fill("-"));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (Math.random() < 0.5) {
        var randomNumber = Math.floor(Math.random() * 9) + 1;
        if (this.validate_input(grid, i, j, randomNumber)) {
          grid[i][j] = randomNumber.toString();
        }
      }
    }
  }
  const initialgrid=JSON.parse(JSON.stringify(grid));
  const checkmove=true;
return [grid,initialgrid,checkmove];

}

async inputreader(){
  const cells = Array.from(document.querySelectorAll('.cell'));
  const selectedcell = await this.waitForEvent(cells, 'click');
  const input=document.getElementById("input").value ;
  document.getElementById("input").value = "";
  console.log(`cell ${selectedcell.id} clicked!`);
return [selectedcell.id,input]
}

waitForEvent(elements, eventName) {
const promises = elements.map(element => {
    return new Promise(resolve => {
      element.addEventListener(eventName, () => {
        resolve(element);
      }, { once: true });
    });
  });
  return Promise.race(promises);
}


validate_input(grid, row, col, value) {
  for (let j = 0; j < 9; j++) {
    if (grid[row][j] == value) {
      return false;
    }
  }
  // Check column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] == value) {
      return false;
    }
  }
  // Check box
  let boxRow = Math.floor(row / 3) * 3;
  let boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i <= boxRow + 2; i++) {
    for (let j = boxCol; j <= boxCol + 2; j++) {
      if (grid[i][j] == value) {
        return false;
      }
    }
  }
  return true;
}






}
