import {GameEngine} from '../GameEngine.js';
export class TicTacToe extends GameEngine{
constructor() {
    super();
  }

drawer(state) {    
    const cells = Array.from(document.querySelectorAll('.cell'));
    let i=0;
    cells.forEach(function(cell){
      cell.textContent = state[0][i];
      i++;      
    });
    document.getElementById("status-text").textContent = `${state[1]}'s Turn`;
  }
  
controller(input,state) {
    if (state[0][input] == "") {
      state[0][input]=state[1];
      state[1] = state[1] == "X" ? "O" : "X";
      state[2]=true;
    }else{
      state[2]=false;
    }
    return state;
  }

initialize(){
    const grid=["", "", "", "", "", "", "", "", ""];
    const currentPlayer = "X";
    const currentmove=true;
    return [grid,currentPlayer,currentmove];
}

async inputreader(){
  const cells = Array.from(document.querySelectorAll('.cell'));
  console.log(cells);
  const selectedcell = await this.waitForEvent(cells, 'click');
  console.log(`cell ${selectedcell.id} clicked!`);
return selectedcell.id
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

}
