export class GameEngine {
    constructor() {    
        let state=this.initialize();
        const loop =() => {
            this.inputreader().then(input => {
                state=this.controller(input,state);
                if(state[2]==true){
                    this.drawer(state);
                }
                else{
                    console.log("Choose a valid input!");
                }
                loop();
            });
        };
        loop();
    }

    drawer(state){}
    controller(input,state){}
    async inputreader(){}
    initialize(){}

}
  


