const Deck = require('./deck.js');
const Game = require('./game.js');



  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = 4790;
  ctx.fillStyle = "#06e4f8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);  

  const CARD_SIZE = {x: 100, y: 140};
  const SYMBOL_SIZE = CARD_SIZE.y*3/14;
  const IN_SET = {x: 10, y: 10};
  const CARD_MARGIN = {x: 20, y: 30};
  // const RIGHT_SIDE = {x: IN_SET.x+5*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y};
  const SUBMIT_SIZE = {x: 150, y: 30};
  const SUBMIT_POS = {x: IN_SET.x+5*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y};
  const DEAL_THREE_MORE_POS = {x: SUBMIT_POS.x, y: SUBMIT_POS.y + SUBMIT_SIZE.y+50};
  const SHOW_VALID_POS = {x: DEAL_THREE_MORE_POS.x, y: DEAL_THREE_MORE_POS.y+SUBMIT_SIZE.y+50};
  const NEW_GAME_POS = {x: SHOW_VALID_POS.x, y: SHOW_VALID_POS.y + SUBMIT_SIZE.y+50};
  const OUT_OF_PLAY_POS = {x: SUBMIT_POS.x+SUBMIT_SIZE.x+CARD_MARGIN.x, y: IN_SET.y};


  deck = new Deck;
  game = new Game;
  deck.createDeck();

let canvasPattern = document.createElement("canvas");
let ctxPattern = canvasPattern.getContext("2d");
canvasPattern.width = 10;
canvasPattern.height = 10;

ctxPattern.beginPath();
ctxPattern.moveTo(10, 10);
ctxPattern.lineTo(0, 0);
ctxPattern.closePath();

canvas.addEventListener("click", handleClick);





  drawCard=( pos, scale)=>{
    ctx.fillStyle = "white";
    ctx.fillRect(pos.x, pos.y, CARD_SIZE.x*scale, CARD_SIZE.y*scale);
  }

 drawDiamond=(card, pos, scale)=>{
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y+SYMBOL_SIZE*scale/2);
  ctx.lineTo(pos.x+SYMBOL_SIZE*scale, pos.y);
  ctx.lineTo(pos.x+2*SYMBOL_SIZE*scale, pos.y+SYMBOL_SIZE*scale/2);
  ctx.lineTo(pos.x+SYMBOL_SIZE*scale, pos.y+SYMBOL_SIZE*scale);
  ctx.lineTo(pos.x, pos.y+SYMBOL_SIZE*scale/2);
  ctx.closePath();
  colorSymbols(card);
}

 drawOval=(card, pos, scale)=>{
  ctx.beginPath();
  ctx.ellipse(pos.x+SYMBOL_SIZE*scale, pos.y+SYMBOL_SIZE*scale/2, SYMBOL_SIZE*scale, SYMBOL_SIZE*scale/2, 0, 0, 2*Math.PI);
  ctx.closePath();
  colorSymbols(card);
}

drawRectangle=( card, pos, scale)=>{
  ctx.beginPath();
  ctx.rect(pos.x, pos.y, 2*SYMBOL_SIZE*scale, SYMBOL_SIZE*scale);
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

drawSymbols=(card, pos, scale)=>{
  if(card.symbol === undefined) drawNullCard(pos, scale);
  if(card.symbol === "rectangle") drawRectangles(card, pos, scale);
  if(card.symbol === "diamond") drawDiamonds(card, pos, scale);
  if(card.symbol === "oval") drawOvals(card, pos, scale);
}

drawNullCard=(pos, scale)=>{

}

drawRectangles=(card, pos, scale)=>{
  if(card.number === 1){
    drawRectangle(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*11/6}, scale)
  } else if (card.number === 2){
    drawRectangle(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*7/6}, scale)
    drawRectangle(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*15/6}, scale)
  } else {
    drawRectangle(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale/2}, scale)
    drawRectangle(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*11/6}, scale)
    drawRectangle(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*19/6}, scale)
  }
}

drawOvals=(card, pos, scale)=>{
  if(card.number === 1){
    drawOval(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*11/6}, scale)
  } else if (card.number === 2){
    drawOval(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*7/6}, scale)
    drawOval(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*15/6}, scale)
  } else {
    drawOval(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale/2}, scale)
    drawOval(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*11/6}, scale)
    drawOval(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*19/6}, scale)
  }
}

drawDiamonds=(card, pos, scale)=>{
  if(card.number === 1){
    drawDiamond(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*11/6}, scale)
  } else if (card.number === 2){
    drawDiamond(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*7/6}, scale)
    drawDiamond(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*15/6}, scale)
  } else {
    drawDiamond(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale/2}, scale)
    drawDiamond(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*11/6}, scale)
    drawDiamond(card, {x: pos.x+SYMBOL_SIZE*scale*2/3, y: pos.y+SYMBOL_SIZE*scale*19/6}, scale)
  }
}

function handleClick(event){
  cx = event.pageX;
  cy = event.pageY;

  handleSelect(cx, cy);
  handleSubmit(cx, cy);
  handleDealThreeMore(cx, cy);
  handleShowMove(cx, cy);
  handleNewGame(cx, cy);
}

handleSelect=(cx, cy)=>{
  for (let i = 0; i < 15; i++) {
    const pos = {x: IN_SET.x+Math.floor(i/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(i%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
    if(cx >= pos.x && cx <= pos.x + CARD_SIZE.x &&
      cy >= pos.y && cy <= pos.y+CARD_SIZE.y){
      let card = deck.faceUpCards[i];
      if (card){
        if(deck.selected.includes(card)){
          deck.selected.splice(deck.selected.indexOf(card), 1);
          // ctx.clearRect(pos.x, pos.y, CARD_SIZE.x, CARD_SIZE.y);
          // drawSymbols(card, pos);
          renderBoard();
          highlightSelected();
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
        drawSymbols(deck.faceUpCards[idx], oldPos, 1);
      }
      break;
    }
  }
}

handleSubmit=(cx, cy)=>{
  if(cx >= SUBMIT_POS.x && cx <= SUBMIT_POS.x + SUBMIT_SIZE.x &&
    cy >= SUBMIT_POS.y && cy <= SUBMIT_POS.y+SUBMIT_SIZE.y){
    if(deck.selected.length ===3){
      if(game.isValidSelection(deck.selected)){
        deck.selected.forEach(card=> {
          deck.removeCard(card);
          drawOutOfPlayCard();
        });
        deck.selected = [];
        renderBoard();
      } 
    }
  }
  showMoveButton();
}

highlightCard=(pos)=>{
  ctx.globalAlpha = .5;
  ctx.fillStyle = "yellow";
  ctx.fillRect(pos.x, pos.y, CARD_SIZE.x, CARD_SIZE.y );
  ctx.globalAlpha = 1;
}

highlightSelected=()=>{
  deck.selected.forEach(card=>{
    idx = deck.faceUpCards.indexOf(card);
    const pos = {x: IN_SET.x+Math.floor(idx/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(idx%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
    highlightCard(pos);
  })
}

ctx.fillStyle = "gray";
ctx.fillRect(SUBMIT_POS.x, SUBMIT_POS.y, SUBMIT_SIZE.x, SUBMIT_SIZE.y);
ctx.fillStyle = "white";
ctx.font = "20px Georgia";
ctx.fillText("Submit", SUBMIT_POS.x, SUBMIT_POS.y+30);

ctx.fillStyle = "gray";
ctx.fillRect(DEAL_THREE_MORE_POS.x, DEAL_THREE_MORE_POS.y, SUBMIT_SIZE.x, SUBMIT_SIZE.y);
ctx.fillStyle = "white";
ctx.font = "20px Georgia";
ctx.fillText("Deal Three More", DEAL_THREE_MORE_POS.x, DEAL_THREE_MORE_POS.y+30);

handleDealThreeMore=(cx, cy)=>{
  if(cx >= DEAL_THREE_MORE_POS.x && cx <= DEAL_THREE_MORE_POS.x + SUBMIT_SIZE.x &&
    cy >= DEAL_THREE_MORE_POS.y && cy <= DEAL_THREE_MORE_POS.y+SUBMIT_SIZE.y
    && deck.faceUpCount <=12 ){
      debugger
    for (let i = 0; i < 15; i++) {
      if(deck.faceUpCards[i].symbol === undefined){
        const pos = {x: IN_SET.x+Math.floor(i/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(i%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
          drawCard(pos, 1);
          drawSymbols(deck.dealCard(i), pos, 1); 
      }
    }
  }
  showMoveButton();
}

handleShowMove=(cx, cy)=>{
  if(cx >= SHOW_VALID_POS.x && cx <= SHOW_VALID_POS.x + SUBMIT_SIZE.x &&
    cy >= SHOW_VALID_POS.y && cy <= SHOW_VALID_POS.y+SUBMIT_SIZE.y){
      renderBoard();
      let selections = game.findAllValidSelections(deck.faceUpCards);
      if(selections.length > 0){
        selections[0].forEach(card =>{
          idx = deck.faceUpCards.indexOf(card);
          const pos = {x: IN_SET.x+Math.floor(idx/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(idx%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
          highlightCard(pos);
        })
        deck.selected = selections[0];
      }
      
    }
  }




renderBoard=()=>{
  for (let i = 0; i < 15; i++) {
    const pos = {x: IN_SET.x+Math.floor(i/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(i%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
    drawCard(pos, 1);
    drawSymbols(deck.faceUpCards[i], pos, 1);
  }
}

handleNewGame=(cx, cy)=>{
  if(cx >= NEW_GAME_POS.x && cx <= NEW_GAME_POS.x + SUBMIT_SIZE.x &&
    cy >= NEW_GAME_POS.y && cy <= NEW_GAME_POS.y+SUBMIT_SIZE.y){
      newGame();
  }
}

newGame=()=>{
  deck = new Deck;
  game = new Game;
  deck.createDeck();
  for (let i = 0; i < 12; i++) {
    deck.dealCard(i);
  }
  for (let j = 12; j < 15; j++) {
    deck.dealNullCard(j);
  }
  renderBoard();
}


window.onload = function() {
  newGame();
  showMoveButton();
}

showMoveButton=()=>{
  ctx.fillStyle = "gray";
  ctx.fillRect(SHOW_VALID_POS.x, SHOW_VALID_POS.y, SUBMIT_SIZE.x, SUBMIT_SIZE.y);
  ctx.fillStyle = "white";
  ctx.font = "20px Georgia";
  ctx.fillText(`${game.findAllValidSelections(deck.faceUpCards).length}`, SHOW_VALID_POS.x, SHOW_VALID_POS.y+10);
  ctx.fillText("Show Move", SHOW_VALID_POS.x, SHOW_VALID_POS.y+30);
}



ctx.fillStyle = "gray";
ctx.fillRect(NEW_GAME_POS.x, NEW_GAME_POS.y, SUBMIT_SIZE.x, SUBMIT_SIZE.y);
ctx.fillStyle = "white";
ctx.font = "20px Georgia";
ctx.fillText("New Game", NEW_GAME_POS.x, NEW_GAME_POS.y+30);

drawOutOfPlayCard=()=>{
  scale = 1/3;
  idx = deck.outOfPlayCards.length - 1;
  let pos = {x: OUT_OF_PLAY_POS.x+(idx%3)*(CARD_SIZE.x+CARD_MARGIN.x)*scale, y: OUT_OF_PLAY_POS.y+Math.floor(idx/3)*(CARD_SIZE.y+CARD_MARGIN.y)*scale}
  drawCard(pos, scale);
  drawSymbols(deck.outOfPlayCards[idx] , pos, scale);
}



