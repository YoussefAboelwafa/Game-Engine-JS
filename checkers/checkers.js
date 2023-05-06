import {GameEngine} from '../GameEngine.js';
export class Checkers extends GameEngine{
    // 🔴->2
    // 🔵->1

constructor()
    {

        this.turn = 1;
        this.piece =[0,0];
        this.canchoose = true;
        this.istouched = false;
        this.board=Array(8).fill().map(() => Array(8).fill(0));
        this.board [0] = [0,2,0,2,0,2,0,2];
        this.board [1] = [2,0,2,0,2,0,2,0];
        this.board [2] = [0,2,0,2,0,2,0,2];
        this.board [5] = [1,0,1,0,1,0,1,0];
        this.board [6] = [0,1,0,1,0,1,0,1];
        this.board [7] = [1,0,1,0,1,0,1,0];

        this.id = [
            ["0", "1", "2", "3", "4", "5", "6", "7"],
            ["8","9", "10", "11", "12", "13", "14", "15"],
            ["16","17","18", "19", "20", "21", "22", "23"],
            ["24","25","26","27", "28", "29", "30", "31"],
            ["32", "33", "34", "35", "36", "37", "38", "39"],
            ["40","41", "42", "43", "44", "45", "46", "47"],
            ["48", "49", "50", "51", "52", "53", "54", "55"],
            ["56","57","58","59","60","61","62","63"]
        ]
    }


drawer(state)
    {
        state[0]
        for(let i=0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                if(this.board[i][j]!=0)
                {
                    const elem=document.getElementById(this.id[i][j]);
                    if (this.board[i][j] == 1) {
                        elem.textContent = '🔵';
                    }
                    else if (this.board[i][j] == 2){
                        elem.textContent = '🔴'
                    }
                    else if (this.board[i][j] == 3){
                        elem.textContent = '🔷'
                    }
                    else if (this.board[i][j] == 4){
                        elem.textContent = '🔶'
                    }
                }
            }
        }
    }
async Controller(position)
    {
        let c = parseInt(position[0]);
        let r = parseInt(position[1]);

        async function jump(jump,id,board) {
            let jumps = [];
            console.log(new Array(board));
            const from = document.getElementById(id[jump[0]][jump[1]]);
            const to = document.getElementById(id[jump[2]][jump[3]]);
            const over = document.getElementById( id[ (jump[0] + jump[2])/2 ][ (jump[1] + jump[3])/2]);
            if (board[jump[0]][jump[1]] === 1 && jump[2] !== 0) {
                to.textContent = '🔵';
                board[jump[2]][jump[3]] = 1;
            }
            else if (board[jump[0]][jump[1]] === 2 && jump[2] !== 7){
                to.textContent = '🔴';
                board[jump[2]][jump[3]] = 2;
            }
            else if (board[jump[0]][jump[1]] === 3 || (board[jump[0]][jump[1]] === 1 && jump[2] === 0)){
                to.textContent = '🔷';
                board[jump[2]][jump[3]] = 3;
            }
            else if (board[jump[0]][jump[1]] === 4 || (board[jump[0]][jump[1]] === 2 && jump[2] === 7)){
                to.textContent = '🔶';
                board[jump[2]][jump[3]] = 4;
            }
            from.textContent = '';
            over.textContent = '';
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
                if (!document.getElementById(ids[jumps[i][2]][jumps[i][3]]).hasChildNodes()) {
                    document.getElementById(ids[jumps[i][2]][jumps[i][3]]).appendChild(div);
                }
                divs.push(div);
            }
            await waitForPress();
            for (let i = 0; i < divs.length; i++) {
                document.getElementById(divs[i].id).remove();
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

        if (this.canchoose && this.istouched && this.board[c][r] === 0){
            this.canchoose = false;
            if ( this.board[this.piece[0]][this.piece[1]] === 1 ){
                if(this.piece[0]-1 === c && (this.piece[1]-1 === r || this.piece[1]+1 === r)){
                    if (this.board[c][r] === 0){
                        let p = 1;
                        if (c === 0){
                            p = p + 2;
                        }
                        const elem1 = document.getElementById(this.id[this.piece[0]][this.piece[1]]);
                        const elem2 = document.getElementById(this.id[c][r]);
                        elem1.textContent = '';
                        if (p === 3){
                            elem2.textContent = '🔷';
                        }
                        else {
                            elem2.textContent = '🔵';
                        }
                        this.board[this.piece[0]][this.piece[1]] = 0;
                        this.board[c][r] = p ;
                        this.turn = 2;
                        console.log(this.canchoose);
                    }
                    else if (this.board[c][r] === 2 || this.board[c][r] === 4){

                    }
                }
            }
            else if(this.board[this.piece[0]][this.piece[1]] === 2){
                if(this.piece[0]+1 === c && (this.piece[1]-1 === r || this.piece[1]+1 === r)){
                    if (this.board[c][r] === 0){
                        let p = 2;
                        if (c === 7){
                            p = p + 2;
                        }
                        const elem1 = document.getElementById(this.id[this.piece[0]][this.piece[1]]);
                        const elem2 = document.getElementById(this.id[c][r]);
                        elem1.textContent = '';
                        if (p === 4){
                            elem2.textContent = '🔶';
                        }
                        else {
                            elem2.textContent = '🔴';
                        }
                        this.board[this.piece[0]][this.piece[1]] = 0;
                        this.board[c][r] = p ;
                        this.turn = 1;
                        console.log(this.canchoose);
                    }

                }
            }
            else if(this.board[this.piece[0]][this.piece[1]] === 3 || this.board[this.piece[0]][this.piece[1]] === 4){
                if ((this.piece[0]+1 === c || this.piece[0]-1 === c )&& (this.piece[1]-1 === r || this.piece[1]+1 === r)){
                    if (this.board[c][r] === 0){
                        let p = this.board[this.piece[0]][this.piece[1]] ;
                        const elem1 = document.getElementById(this.id[this.piece[0]][this.piece[1]]);
                        const elem2 = document.getElementById(this.id[c][r]);
                        elem1.textContent = '';
                        if (p === 4){
                            elem2.textContent = '🔶';
                            this.turn = 1;
                        }
                        else {
                            elem2.textContent = '🔷';
                            this.turn = 2;
                        }
                        this.board[this.piece[0]][this.piece[1]] = 0;
                        this.board[c][r] = p ;
                        console.log(this.canchoose);
                    }
                }
            }
            console.log("col:" + c + " row:" + r);
            this.istouched = false;
            this.canchoose = true;
        }
        else if (this.canchoose && this.board[c][r] !== 0){
            if(! await check(this.board,this.id,this.turn)) {
                this.piece[0] = c;
                this.piece[1] = r;
                if (this.turn == 1 && this.board[c][r] % 2 === 1) {
                    this.istouched = true;
                    console.log("blue");
                } else if (this.turn == 2 && this.board[c][r] % 2 === 0) {
                    this.istouched = true;
                    console.log("red");
                }
            }
            else{
                if (this.turn === 1){
                    this.turn = 2;
                }
                else {
                    this.turn = 1;
                }

            }
        }
    }


}
