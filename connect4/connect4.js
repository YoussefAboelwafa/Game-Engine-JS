class Connect4 {
    
    constructor()
    {
        this.board=[['white','white','white','white','white','white','white'],
                    ['white','white','white','white','white','white','white'],
                    ['white','white','white','white','white','white','white'],
                    ['white','white','white','white','white','white','white'],
                    ['white','white','white','white','white','white','white'],
                    ['white','white','white','white','white','white','white']];
                    
        this.id=[['0','1','2','3','4','5','6'],
        ['7','8','9','10','11','12','13'],
        ['14','15','16','17','18','19','20'],
        ['21','22','23','24','25','26','27'],
        ['28','29','30','31','32','33','34'],
        ['35','36','37','38','39','40','41']];
        this.player=1;
        this.colors=[]
        this.colors[1]='yellow'
        this.colors[-1]='red'
        this.counter=0;
        

    }
 Drawer(){
//  if(this.counter==0){
//    const body=document.body;
//    const grid=document.createElement("div");
//    grid.classList.add("grid");
//    body.append(grid);
//    const label1=document.createElement("LABEL");
//    label1.textContent="0";
//    grid.appendChild(label1);
//    const label2=document.createElement("LABEL");
//    label2.textContent="1";
//    grid.appendChild(label2);
//    const label3=document.createElement("LABEL");
//    label3.textContent="2";
//    grid.appendChild(label3);
//    const label4=document.createElement("LABEL");
//    label4.textContent="3";
//    grid.appendChild(label4);
//    const label5=document.createElement("LABEL");
//    label5.textContent="4";
//    grid.appendChild(label5);
//    const label6=document.createElement("LABEL");
//    label6.textContent="5";
//    grid.appendChild(label6);
//    const label7=document.createElement("LABEL");
//    label7.textContent="6";
//    grid.appendChild(label7);
//    let count=0;
//    let mycount=count.toString();
//    for(let i=0;i<6;i++)
//    { for(let j=0;j<7;j++){
//     const gridItem = document.createElement('div');
//     gridItem.classList.add('grid-item');
//     mycount=count.toString();
//     gridItem.setAttribute('id', mycount);
//     grid.appendChild(gridItem);
//     count++;
//    }
//    }

//    const input=document.createElement("INPUT");
//    const button=document.createElement("BUTTON");
//    button.textContent="submit";
//    button.classList.add("box");
//    button.setAttribute("onclick","connect4.takeInput()");
//    input.setAttribute("type","text");
//    input.setAttribute("id","input");
//    input.classList.add("input");
//    body.appendChild(input);
//    body.appendChild(button);
// const styleElement = document.createElement('style');
// // Set the CSS rules as text content of the style element
// const css = '.grid {display: grid; grid-template-columns: repeat(7,110px);grid-template-rows: repeat(6,110px);background-color: black;margin: 0 auto;justify-content: center;margin-top: 100px;width: 780px; height: 770px; } .grid-item{border: 5px solid black;border-radius: 50%;outline: 5px solid black;}.grid-item:hover{background-color: rgba(75, 204, 255);}.input{width: 150px;height: 50px;margin-top: 30px;margin-left: 850px;font-size: 30px;border-radius: 15px;border-width: 3px;border-color: blueviolet;color: red;}.box{ height: 50px;margin-bottom: 100px;background-color: rgb(0, 255, 170); font-size: larger;border-radius: 15px;border-width: 3px; border-color: black;}label{font-size: 30px;color: violet;margin-top: 70px;margin-left: 50px;}';
// styleElement.textContent = css;
// // Append the <style> element to the <head> of the HTML document
// document.head.appendChild(styleElement);
//  }
 // setting the colors of the cells according to the board array
 for(let i=0;i<6;i++)
 { for(let j=0;j<7;j++){
  const myElement = document.getElementById(this.id[i][j]);
        myElement.style.backgroundColor = this.board[i][j];
 }
 }
}
controller(input)
{ console.log(input)
  if(input>6 || input<0)
  {
    alert('invalid input')
  }
  else{
    let found=false;
  for(let i=5;i>=0;i--)
  {
    if(this.board[i][input]=='white')
    {
        this.board[i][input]=this.colors[this.player];
        console.log(this.board[i][input])
        found=true;
        break;
    }
  }
  if(!found){
    alert('no more empty cells');
  }
  else{
  this.player*=-1;
  this.counter=1;
  }
}
document.getElementById("input").value='';
  this.drawer();
}
takeInput()
{
    const input=document.getElementById("input").value;
    this.controller(input)
}
}
let connect4=new Connect4(); 
connect4.drawer();




