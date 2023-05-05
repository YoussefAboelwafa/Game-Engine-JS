import {GameEngine} from '../GameEngine.js';
export class Connect4 extends GameEngine{
constructor() {
    super()
  }  
controller(input,state){
  if(input=="" || input > 6 || input<0){
    state[2]=false
    return state;
  }

  let found=false;
  for(let i=5;i>=0;i--){
    if(state[0][i][input]=="white"){
      if(state[1]==true){
        state[0][i][input]="yellow";
      }else{
        state[0][i][input]="red";
      }
      found=true;
      break;
    }
  }

  if(!found){
    state[2]=false;
    return state;
  }else{
    state[1]=!state[1];
    state[2]=true;
  }

  return state;
}
drawer(state) {
    let id=0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        const myElement = document.getElementById(id);
        myElement.style.backgroundColor = state[0][i][j];
        id++;
      }
    }
  }
initialize(){
    const grid=[
      ["white", "white", "white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white", "white", "white"],
      ["white", "white", "white", "white", "white", "white", "white"],
    ];
    const currentPlayer=true;
    const currentmove=true;
    return [grid,currentPlayer,currentmove];
  }
async inputreader(){
  await this.waitForButton('enterbutton');
  const input = document.getElementById("input").value;
  document.getElementById("input").value = "";
  return input; 

}

waitForButton(buttonId) {
    return new Promise(resolve => {
      const button = document.getElementById(buttonId);
      const listener = () => {
        button.removeEventListener('click', listener);
        resolve();
      };
      button.addEventListener('click', listener);
    });
  }



  
}
