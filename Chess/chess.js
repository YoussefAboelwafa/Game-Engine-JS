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
    const from = await this.waitForEvent(cells, 'click');
    const to = await this.waitForEvent(cells, 'click');
    console.log(`cell from ${from.id} clicked!`);
    console.log(`cell to ${to.id} clicked!`);
    return [from.id,to.id];
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

