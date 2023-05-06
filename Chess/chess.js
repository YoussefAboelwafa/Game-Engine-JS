import {GameEngine} from '../GameEngine.js';
export class Chess extends GameEngine{
  constructor() {
    super();
  }
  
  initialize(){}

  drawer(state){}

  controller(input,state){
    console.log(`now from cell ${input[0]} to ${input[1]}`);
  }
  
  async inputreader(){
    const cells = Array.from(document.querySelectorAll('.cell'));
    console.log(cells);
    const cell1 = await this.waitForEvent(cells, 'click');
    const cell2 = await this.waitForEvent(cells, 'click');
    console.log(`cell from ${cell1.id} clicked!`);
    console.log(`cell to ${cell2.id} clicked!`);

  return [cell1.id,cell2.id];
  }
  
  waitForEvent(elements, eventName) {
  const promises = elements.map(element => {
      return new Promise(resolve => {
        element.addEventListener(eventName, () => {
          resolve(element);
        }, { once: true });
      });
    });
}



}

