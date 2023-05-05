export class GameEngine {
    constructor() {    
        let state=this.initialize();
        this.drawer(state);
        const loop =() => {
            this.inputreader().then(input => {
                state=this.controller(input,state);
                console.log(state);
                if(state[2]==true){
                    this.drawer(state);
                }
                else{
                    alert("Choose a valid input!");
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
  


