const Deck = require('./deck.js');


  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = 4790;
  ctx.fillStyle = "#06e4f8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);  

  const CARD_SIZE = {x: 100, y: 140};
  const SYMBOL_SIZE = CARD_SIZE.y*3/14;
  const IN_SET = {x: 100, y: 100};
  const CARD_MARGIN = {x: 20, y: 30};

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

canvas.addEventListener("click", handleClick);





  drawCard=( pos)=>{
    ctx.fillStyle = "white";
    ctx.fillRect(pos.x, pos.y, CARD_SIZE.x, CARD_SIZE.y );
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

function handleClick(event){
  cx = event.pageX;
  cy = event.pageY;

  for (let i = 0; i < 15; i++) {
    const pos = {x: IN_SET.x+Math.floor(i/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(i%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
    if(cx >= pos.x && cx <= pos.x + CARD_SIZE.x &&
      cy >= pos.y && cy <= pos.y+CARD_SIZE.y){
      let card = deck.faceUpCards[i];
      if (card){
        if(deck.selected.includes(card)){
          deck.selected.splice(deck.selected.indexOf(card), 1);
          ctx.clearRect(pos.x, pos.y, CARD_SIZE.x, CARD_SIZE.y);
          drawSymbols(card, pos);
        } else {
          deck.selected.push(deck.faceUpCards[i]);
          highlightCard(pos);
        }
      } 
      if (deck.selected.length > 3) {
        const idx = deck.faceUpCards.indexOf(deck.selected[2]);
        const oldPos = {x: IN_SET.x+Math.floor(idx/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(idx%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
        deck.selected.splice(2, 1);
        ctx.clearRect(oldPos.x, oldPos.y, CARD_SIZE.x, CARD_SIZE.y);
        drawSymbols(deck.faceUpCards[idx], oldPos);
      }
      break;
    }
  }
}

for (let i = 0; i < 12; i++) {
  const pos = {x: IN_SET.x+Math.floor(i/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(i%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
  drawCard(pos);
  drawSymbols(deck.deal_card(), pos);
}

highlightCard=(pos)=>{
  ctx.globalAlpha = .5;
  ctx.fillStyle = "yellow";
  ctx.fillRect(pos.x, pos.y, CARD_SIZE.x, CARD_SIZE.y );
  ctx.globalAlpha = 1;

}





