import {GameEngine} from '../GameEngine.js';

export class Checkers extends GameEngine{
    // 🔴->2
    // 🔵->1
    constructor()
    {
        super();
    }
    
    initialize(){
        const turn = 1;
        const piece =[0,0];
        const canchoose = true;
        const istouched = false;
        const board=Array(8).fill().map(() => Array(8).fill(0));
        board [0] = [0,2,0,2,0,2,0,2];
        board [1] = [2,0,2,0,2,0,2,0];
        board [2] = [0,2,0,2,0,2,0,2];
        board [5] = [1,0,1,0,1,0,1,0];
        board [6] = [0,1,0,1,0,1,0,1];
        board [7] = [1,0,1,0,1,0,1,0];
        const id = [
            ["0", "1", "2", "3", "4", "5", "6", "7"],
            ["8","9", "10", "11", "12", "13", "14", "15"],
            ["16","17","18", "19", "20", "21", "22", "23"],
            ["24","25","26","27", "28", "29", "30", "31"],
            ["32", "33", "34", "35", "36", "37", "38", "39"],
            ["40","41", "42", "43", "44", "45", "46", "47"],
            ["48", "49", "50", "51", "52", "53", "54", "55"],
            ["56","57","58","59","60","61","62","63"]
        ]
        return[board,id,true,turn,piece,canchoose,istouched]
    }

    async inputreader(){
        const cells = Array.from(document.querySelectorAll('.cell'));
        const selectedcell = await this.waitForEvent(cells, 'click');
        console.log(`cell ${selectedcell.id} clicked!`);
      return [parseInt(selectedcell.id[0]),parseInt(selectedcell.id[1])];
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
      
    drawer(state)
    {
        for(let i=0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                if(state[0][i][j]!=0)
                {
                    const elem=document.getElementById(i.toString()+j.toString());
                    if (state[0][i][j] == 1) {
                        elem.textContent = '🔵';
                    }
                    else if (state[0][i][j] == 2){
                        elem.textContent = '🔴'
                    }
                    else if (state[0][i][j] == 3){
                        elem.textContent = '🔷'
                    }
                    else if (state[0][i][j] == 4){
                        elem.textContent = '🔶'
                    }
                }
            }
        }
    }


    controller(position,state)
    {

        console.log(position);
        // [board,id,true,turn,piece,canchoose,istouched]
        let c = position[0];
        let r = position[1];
        let board = state[0];
        let id = state[1];
        let turn = state[3];
        let piece = state[4];
        let canchoose = state[5];
        let istouched = state[6];

        async function jump(jump,id,board) {
            let jumps = [];
            console.log(new Array(board));
            if (board[jump[0]][jump[1]] === 1 && jump[2] !== 0) {
                board[jump[2]][jump[3]] = 1;
            }
            else if (board[jump[0]][jump[1]] === 2 && jump[2] !== 7){
                board[jump[2]][jump[3]] = 2;
            }
            else if (board[jump[0]][jump[1]] === 3 || (board[jump[0]][jump[1]] === 1 && jump[2] === 0)){
                board[jump[2]][jump[3]] = 3;
            }
            else if (board[jump[0]][jump[1]] === 4 || (board[jump[0]][jump[1]] === 2 && jump[2] === 7)){
                board[jump[2]][jump[3]] = 4;
            }
            board[jump[0]][jump[1]] = 0;
            board[ (jump[0] + jump[2])/2 ][ (jump[1] + jump[3])/2] = 0;
            console.log(new Array(board));
            let c = jump[2];
            let r = jump[3];
            if (c > 1 && board[c][r] === 1){
                if ( r > 1 && board[c-1][r-1]%2 === 0 && board[c-2][r-2] === 0 && board[c-1][r-1] !== 0){
                    jumps.push([c,r,c-2,r-2]);
                }
                else if (r < 6 && board[c-1][r+1]%2 === 0 && board[c-2][r+2] === 0 && board[c-1][r+1] !== 0){
                    jumps.push([c,r,c-2,r+2]);
                }
            }
            else if (c < 6 && board[c][r] === 2){
                if ( r > 1 && board[c+1][r-1]%2 === 1 && board[c+2][r-2] === 0 && board[c-1][r-1] !== 0){
                    jumps.push([c,r,c+2,r-2]);
                }
                else if (r < 6 && board[c+1][r+1]%2 === 1 && board[c+2][r+2] === 0 && board[c-1][r+1] !== 0){
                    jumps.push([c,r,c+2,r+2]);
                }
            }
            else {
                if (c > 1 && r > 1 && board[c-1][r-1]%2 !== board[c][r]%2 && board[c-2][r-2] === 0 && board[c-1][r-1] !== 0){
                    jumps.push([c,r,c-2,r-2]);
                }
                else if (c > 1 && r < 6 && board[c-1][r+1]%2 !== board[c][r]%2 && board[c-2][r+2] === 0 && board[c-1][r+1] !== 0){
                    jumps.push([c,r,c-2,r+2]);
                }
                else if (c < 6 && r > 1 && board[c+1][r-1]%2 !== board[c][r]%2 && board[c+2][r-2] === 0 && board[c+1][r-1] !== 0){
                    jumps.push([c,r,c+2,r-2]);
                }
                else if (c < 6 && r < 6 && board[c+1][r+1]%2 !== board[c][r]%2 && board[c+2][r+2] === 0 && board[c+1][r+1] !== 0){
                    jumps.push([c,r,c+2,r+2]);
                }

            }
            if (jumps.length >0){
                await choosejumber(jumps,id,board);
            }
        }

        async function choosejumber(jumps,ids,board) {
            let divs = [];
            let waitForPressResolve,po;
            function waitForPress() {
                return new Promise(resolve => waitForPressResolve = resolve);
            }
            function choice(c) {
                if (waitForPressResolve) waitForPressResolve();
                po =  c;
            }
            for (let i=0;i<jumps.length;i++){
                let div = document.createElement("div");
                div.style.width = "42px";
                div.style.height = "42px";
                div.style.background = "yellow";
                div.setAttribute("id",'c' + i.toString());
                div.addEventListener('click',function () {
                    choice(div.id);
                });
                if (!document.getElementById([jumps[i][2]].toString()+[jumps[i][3]].toString()).hasChildNodes()) {
                    document.getElementById([jumps[i][2]].toString()+[jumps[i][3]].toString()).appendChild(div);
                }
                divs.push(div);
            }
            await waitForPress();
            for (let i = 0; i < divs.length; i++) {
                if(document.getElementById(divs[i].id) !== null) {
                    document.getElementById(divs[i].id).remove();
                }
            }
            po = parseInt( po.slice(1));
            await jump(jumps[po] ,ids ,board)
        }

        async function check(board ,id ,ele) {
            ++ele;
            console.log("ele",ele%2);
            let NumOfjumbs = 0;
            let jumbs = [];
            for (let c = 1; c < board.length-1; c++) {
                for (let r = 1; r <board.length-1 ; r++) {
                    if (board[c][r]%2 === ele%2 && board[c][r] !==0) {
                        if (board[c + 1][r + 1] === 0 && board[c - 1][r - 1] !== 0 && board[c][r] % 2 !== board[c - 1][r - 1] % 2) {
                            if (board[c - 1][r - 1] !== 1) {
                                ++NumOfjumbs;
                                jumbs.push([c - 1, r - 1, c + 1, r + 1]);
                            }
                        }
                        if (board[c + 1][r - 1] === 0 && board[c - 1][r + 1] !== 0 && board[c][r] % 2 !== board[c - 1][r + 1] % 2) {
                            if (board[c - 1][r + 1] !== 1) {
                                ++NumOfjumbs;
                                jumbs.push([c - 1, r + 1, c + 1, r - 1]);
                            }
                        }
                        if (board[c + 1][r + 1] !== 0 && board[c - 1][r - 1] === 0 && board[c][r] % 2 !== board[c + 1][r + 1] % 2) {
                            if (board[c + 1][r + 1] !== 2) {
                                ++NumOfjumbs;
                                jumbs.push([c + 1, r + 1, c - 1, r - 1]);
                            }
                        }
                        if (board[c + 1][r - 1] !== 0 && board[c - 1][r + 1] === 0 && board[c][r] % 2 !== board[c + 1][r - 1] % 2) {
                            if(board[c + 1][r - 1] !== 2) {
                                ++NumOfjumbs;
                                jumbs.push([c + 1, r - 1, c - 1, r + 1]);
                            }
                        }
                    }
                }
            }
            if (NumOfjumbs > 0) {
                console.log(jumbs);
                await choosejumber(jumbs, id, board);
                return true;
            }
            return false;
        }

        if (canchoose && istouched && board[c][r] === 0){
            canchoose = false;
            if ( board[piece[0]][piece[1]] === 1 ){
                if(piece[0]-1 === c && (piece[1]-1 === r || piece[1]+1 === r)){
                    if (board[c][r] === 0){
                        let p = 1;
                        if (c === 0){
                            p = p + 2;
                        }
                        board[piece[0]][piece[1]] = 0;
                        board[c][r] = p ;
                        turn = 2;
                        console.log(canchoose);
                    }
                    else if (board[c][r] === 2 || board[c][r] === 4){

                    }
                }
            }
            else if(board[piece[0]][piece[1]] === 2){
                if(piece[0]+1 === c && (piece[1]-1 === r || piece[1]+1 === r)){
                    if (board[c][r] === 0){
                        let p = 2;
                        if (c === 7){
                            p = p + 2;
                        }
                        board[piece[0]][piece[1]] = 0;
                        board[c][r] = p ;
                        turn = 1;
                        console.log(this.canchoose);
                    }

                }
            }
            else if(board[piece[0]][piece[1]] === 3 || board[piece[0]][piece[1]] === 4){
                if ((piece[0]+1 === c || piece[0]-1 === c )&& (piece[1]-1 === r || piece[1]+1 === r)){
                    if (board[c][r] === 0){
                        let p = board[piece[0]][piece[1]] ;
                        board[piece[0]][piece[1]] = 0;
                        board[c][r] = p ;
                        console.log(this.canchoose);
                    }
                }
            }
            console.log("col:" + c + " row:" + r);
            istouched = false;
            canchoose = true;
            state[2] = true;
            state[3] = turn ;
            state[4] = piece;
            state[5] = canchoose;
            state[6] = istouched;

        }
        else if (canchoose && board[c][r] !== 0){
            if(! check(board,id,turn)) {
                piece[0] = c;
                piece[1] = r;
                if (turn == 1 && board[c][r] % 2 === 1) {
                    istouched = true;
                    console.log("blue");
                } else if (turn == 2 && board[c][r] % 2 === 0) {
                    istouched = true;
                    console.log("red");
                }
            }
            else{
                if (turn === 1){
                    turn = 2;
                }
                else {
                    turn = 1;
                }

            }
            state[2] = true;
            state[3] = turn ;
            state[4] = piece;
            state[5] = canchoose;
            state[6] = istouched;
        }
        else {
            state[2] = false;
            state[3] = turn ;
            state[4] = piece;
            state[5] = canchoose;
            state[6] = istouched;
        }
        console.log("state is");
        console.log(state);
        return state;

    }

}