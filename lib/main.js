const Deck = require('./deck.js');


  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = 4790;
  ctx.fillStyle = "#578a81";
  ctx.fillRect(0, 0, canvas.width, canvas.height);  

  const CARD_SIZE = 140;
  const SYMBOL_SIZE = CARD_SIZE*3/14;
  const IN_SET = {x: 100, y: 100};

  deck = new Deck;
  deck.create_deck();

let canvasPattern = document.createElement("canvas");
let ctxPattern = canvasPattern.getContext("2d");
canvasPattern.width = 10;
canvasPattern.height = 10;

ctxPattern.beginPath();
ctxPattern.moveTo(10, 10);
ctxPattern.lineTo(0, 0);
ctxPattern.closePath();



  drawCard=( pos)=>{
    ctx.strokeStyle = "blue";
    ctx.strokeRect(pos.x, pos.y, CARD_SIZE*5/7, CARD_SIZE );
  }



 drawDiamond=(card, pos)=>{
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y+SYMBOL_SIZE/2);
  ctx.lineTo(pos.x+SYMBOL_SIZE, pos.y);
  ctx.lineTo(pos.x+2*SYMBOL_SIZE, pos.y+SYMBOL_SIZE/2);
  ctx.lineTo(pos.x+SYMBOL_SIZE, pos.y+SYMBOL_SIZE);
  ctx.lineTo(pos.x, pos.y+SYMBOL_SIZE/2);
  ctx.closePath();
  colorSymbols(card);

}



 drawOval=(card, pos)=>{
  ctx.beginPath();
  ctx.ellipse(pos.x+SYMBOL_SIZE, pos.y+SYMBOL_SIZE/2, SYMBOL_SIZE, SYMBOL_SIZE/2, 0, 0, 2*Math.PI);
  ctx.closePath();
  colorSymbols(card);
}

drawRectangle=( card, pos)=>{
  ctx.beginPath();
  ctx.rect(pos.x, pos.y, 2*SYMBOL_SIZE, SYMBOL_SIZE);
  ctx.closePath();
  colorSymbols(card);
}

colorSymbols=(card)=>{
  ctx.fillStyle = card.color;
  ctx.strokeStyle = card.color
  if(card.shading === "open") ctx.stroke();
  if(card.shading === "solid") ctx.fill();
  if(card.shading === "striped") {
    ctxPattern.strokeStyle = card.color;
    ctxPattern.stroke();
    ctx.fillStyle = ctx.createPattern(canvasPattern,"repeat");
    ctx.stroke();
    ctx.fill(); 
  }
}

drawSymbols=(card, pos)=>{
  if(card.symbol === "rectangle") drawRectangles(card, pos);
  if(card.symbol === "diamond") drawDiamonds(card, pos);
  if(card.symbol === "oval") drawOvals(card, pos);
}

drawRectangles=(card, pos)=>{
  if(card.number === 1){
    drawRectangle(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*11/6})
  } else if (card.number === 2){
    drawRectangle(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*7/6})
    drawRectangle(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*15/6})
  } else {
    drawRectangle(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE/2})
    drawRectangle(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*11/6})
    drawRectangle(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*19/6})
  }
}

drawOvals=(card, pos)=>{
  if(card.number === 1){
    drawOval(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*11/6})
  } else if (card.number === 2){
    drawOval(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*7/6})
    drawOval(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*15/6})
  } else {
    drawOval(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE/2})
    drawOval(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*11/6})
    drawOval(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*19/6})
  }
}

drawDiamonds=(card, pos)=>{
  if(card.number === 1){
    drawDiamond(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*11/6})
  } else if (card.number === 2){
    drawDiamond(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*7/6})
    drawDiamond(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*15/6})
  } else {
    drawDiamond(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE/2})
    drawDiamond(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*11/6})
    drawDiamond(card, {x: pos.x+SYMBOL_SIZE*2/3, y: pos.y+SYMBOL_SIZE*19/6})
  }
}

for (let i = 0; i < deck.pile.length; i++) {
  const pos = {x: IN_SET.x+(i%3)*120, y: IN_SET.y+Math.floor(i/3)*170};
  drawCard(pos);
  drawSymbols(deck.pile[i], pos);
}



