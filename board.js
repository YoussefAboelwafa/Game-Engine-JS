import {GameEngine} from './GameEngine.js';

export class Board extends GameEngine{
    constructor(){
        super()
    }

    drawer(name){
    
    document.getElementById("1").innerHTML = name;  
    }
    controller(name){
        document.getElementById("2").innerHTML = name;  
    }

    async inputreader(){
        const buttons = Array.from(document.querySelectorAll('.button'));
        const button = await this.waitForEvent(buttons, 'click');
        console.log(`Button ${button.id} clicked!`);
        return button.id
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

