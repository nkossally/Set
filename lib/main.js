const Deck = require('./deck.js');
const Game = require('./game.js');

let showCount = 0;
let score = 0;

let instructionsShowing = false;

let background = new Image();
background.src = './assets/images/escher.png';
let canvasBackground = document.createElement("canvas");
let ctxBackground = canvasBackground.getContext("2d");


  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  const CARD_SIZE = {x: 100*130/140, y: 140*130/140};
  const SYMBOL_SIZE = CARD_SIZE.y*3/14;
  const IN_SET = {x: 10, y: 80};
  const CARD_MARGIN = {x: 20, y: 30};
  const SUBMIT_SIZE = {x: 150, y: 30};
  const SCORE_POS = {x: IN_SET.x+5*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y};
  const SUBMIT_POS = {x: SCORE_POS.x, y: SCORE_POS.y + SUBMIT_SIZE.y+30};
  const DEAL_THREE_MORE_POS = {x: SUBMIT_POS.x, y: SUBMIT_POS.y + SUBMIT_SIZE.y+30};
  const SHOW_MOVE_POS = {x: DEAL_THREE_MORE_POS.x, y: DEAL_THREE_MORE_POS.y+SUBMIT_SIZE.y+30};
  const SHOW_VALID_POS = {x: SHOW_MOVE_POS.x, y: SHOW_MOVE_POS.y+SUBMIT_SIZE.y+30};
  const INSTRUCTIONS_BUTTON_POS= {x: SHOW_VALID_POS.x, y: SHOW_VALID_POS.y + SUBMIT_SIZE.y+30};
  const NEW_GAME_POS = {x: INSTRUCTIONS_BUTTON_POS.x, y: INSTRUCTIONS_BUTTON_POS.y + SUBMIT_SIZE.y+30};
  const INSTRUCTIONS_POS = {x: IN_SET.x+2*CARD_SIZE.x+1.5*CARD_MARGIN.x, y: 2};
  const INSTRUCTIONS_SIZE = {x: 600, y: canvas.height};
  const CLOSE_INSTRUCTIONS_POS = {x: INSTRUCTIONS_POS.x+INSTRUCTIONS_SIZE.x - 40, y: 10};
  const CLOSE_INSTRUCTIONS_SIZE = {x: 20, y: 20};
  const OUT_OF_PLAY_POS = {x: SUBMIT_POS.x+SUBMIT_SIZE.x+CARD_MARGIN.x, y: IN_SET.y};
  const YOU_WIN_POS = {x: 150, y:350 }
  const YOU_WIN_SIZE = {x: 300, y: 300};
  


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


drawRoundedRec=(pos, width, length, radius, color)=>{
      ctx.beginPath();
      ctx.moveTo(pos.x+radius, pos.y);
      ctx.lineTo(pos.x+width-radius, pos.y, radius);
      ctx.arcTo(pos.x+width, pos.y, pos.x+width, pos.y+radius, radius);
      ctx.lineTo(pos.x+width, pos.y+length-radius);
      ctx.arcTo(pos.x+width, pos.y+length, pos.x+width-radius, pos.y+length, radius);
      ctx.lineTo(pos.x+radius, pos.y+length);
      ctx.arcTo(pos.x, pos.y+length, pos.x, pos.y+length-radius, radius);
      ctx.lineTo(pos.x, pos.y+radius);
      ctx.arcTo(pos.x, pos.y, pos.x+radius, pos.y, radius);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();

 }

 drawButton=(pos, text, textPos, color)=>{
  drawRoundedRec(pos, SUBMIT_SIZE.x, SUBMIT_SIZE.y, SUBMIT_SIZE.x/10, color);
  ctx.fillStyle = "white";
  ctx.font = "19px Georgia";
  ctx.fillText(text, pos.x+textPos.x, pos.y+textPos.y);
}
    

    // ctx.fillStyle = "white";
    // ctx.fillRect(100, 100, 5, 5);  



  drawCard=( pos, scale, color)=>{
    // ctx.fillStyle = "white";
    drawRoundedRec(pos, CARD_SIZE.x*scale, CARD_SIZE.y*scale, CARD_SIZE.x*scale/10, color);
    ctx.strokeStyle = "#f8cdbf";
    ctx.stroke();
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
  if(card.symbol === undefined){
    ctx.globalAlpha = .5;
    drawCard(pos, 1, ctx.createPattern(background,"repeat"))
    ctx.globalAlpha = 1;
  }
  if(card.symbol === "rectangle") drawRectangles(card, pos, scale);
  if(card.symbol === "diamond") drawDiamonds(card, pos, scale);
  if(card.symbol === "oval") drawOvals(card, pos, scale);
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
  if(instructionsShowing){
    handleCloseInstructions(cx, cy);
  } else if (score < 10) {
    
    handleShowInstructions(cx, cy);
    handleSelect(cx, cy);
    handleSubmit(cx, cy);
    handleDealThreeMore(cx, cy);
    handleShowMove(cx, cy);
    handleNewGame(cx, cy);
  }  else {
    handleNewGame(cx, cy);

  }
}

handleSelect=(cx, cy)=>{
  for (let i = 0; i < 15; i++) {
    const pos = {x: IN_SET.x+Math.floor(i/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(i%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
    if(cx >= pos.x && cx <= pos.x + CARD_SIZE.x &&
      cy >= pos.y && cy <= pos.y+CARD_SIZE.y){
      let card = deck.faceUpCards[i];
      if (card && card.symbol !== undefined){
        if(deck.selected.includes(card)){
          deck.selected.splice(deck.selected.indexOf(card), 1);
          renderBoard();
          highlightSelected();
        } else {
          deck.selected.push(deck.faceUpCards[i]);
          highlightSelected();
        }
      } 
      if (deck.selected.length > 3) {
        const idx = deck.faceUpCards.indexOf(deck.selected[2]);
        const oldPos = {x: IN_SET.x+Math.floor(idx/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(idx%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
        deck.selected.splice(2, 1);
        // ctx.clearRect(oldPos.x, oldPos.y, CARD_SIZE.x, CARD_SIZE.y);
        drawCard(oldPos, 1, "white");
        drawSymbols(deck.faceUpCards[idx], oldPos, 1);
      }
      break;
    }
  }
}



handleSubmit=(cx, cy)=>{
  if(cx >= SUBMIT_POS.x && cx <= SUBMIT_POS.x + SUBMIT_SIZE.x &&
    cy >= SUBMIT_POS.y && cy <= SUBMIT_POS.y+SUBMIT_SIZE.y){
    drawButton(SUBMIT_POS, "Submit", {x: 42, y: 22}, "#d2cecf");
    window.setTimeout(  function(){drawButton(SUBMIT_POS, "Submit", {x: 42, y: 22}, "gray")}, 100);
    if(deck.selected.length ===3){
      if(game.isValidSelection(deck.selected)){
        deck.selected.forEach(card=> {
          deck.removeCard(card);
          drawOutOfPlayCards();
        });
        deck.selected = [];
        renderBoard();
        score +=1;
        showNumberOfMoves();
        showScore();
        if(score === 10) showWin();

      } 
    }
  }


}

showWin=()=>{
  ctx.fillStyle = "#847b7e";
  ctx.font = "50px Georgia";
  ctx.fillText("You win!", YOU_WIN_POS.x, YOU_WIN_POS.y );

}

highlightCard=(pos, color)=>{
  ctx.globalAlpha = .3;
  drawRoundedRec(pos, CARD_SIZE.x, CARD_SIZE.y, CARD_SIZE.x/10, color);
  ctx.globalAlpha = 1;
}

highlightSelected=()=>{
  let color = game.isValidSelection(deck.selected) ? "#07eb1d" : "yellow";
  deck.selected.forEach(card=>{
    idx = deck.faceUpCards.indexOf(card);
    const pos = {x: IN_SET.x+Math.floor(idx/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(idx%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
    highlightCard(pos, color);
  })
}

drawInstructions=()=>{
  drawButton(INSTRUCTIONS_BUTTON_POS, "Instructions", {x: 23, y: 21}, "gray");

  ctx.fillStyle = "gray";
  ctx.globalAlpha = .5;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  instructionsShowing = true;

  ctx.globalAlpha = 1;
  ctx.fillStyle= "#BDF3FF";
  ctx.strokeStyle="#847b7e";
  ctx.fillRect(INSTRUCTIONS_POS.x, INSTRUCTIONS_POS.y, INSTRUCTIONS_SIZE.x, INSTRUCTIONS_SIZE.y);
  ctx.beginPath();
  ctx.rect(INSTRUCTIONS_POS.x, INSTRUCTIONS_POS.y, INSTRUCTIONS_SIZE.x, INSTRUCTIONS_SIZE.y);
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = "red";
  ctx.fillRect(CLOSE_INSTRUCTIONS_POS.x, CLOSE_INSTRUCTIONS_POS.y, CLOSE_INSTRUCTIONS_SIZE.x, CLOSE_INSTRUCTIONS_SIZE.y);
  ctx.fillStyle = "white";
  ctx.font = "19px Georgia";
  ctx.fillText("x", CLOSE_INSTRUCTIONS_POS.x+6, CLOSE_INSTRUCTIONS_POS.y+15);

  ctx.fillStyle = "#514e4f";
  ctx.fillText("                                               Instructions:", INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+50 );
  
  ctx.font = "18px Georgia";

  ctx.fillText("   The object of each round of Set is to find a ‘set’ of three cards from the", 
    INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+90 );

  ctx.fillText("      available face up cards. Each card has four features (color, symbol,", 
    INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+115 );
  
  ctx.fillText("   number and shading). In a proper ‘set,’ for each feature, all three cards", 
    INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+140 );

  ctx.fillText("     have the same variation of the feature, or different variations of the", 
    INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+165 );

  ctx.fillText("                feature. The variations of each feature are as follows:", 
    INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+190 );
  
  ctx.fillText("                              1. Color: red, green, or blue.", INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+215 );
  ctx.fillText("                              2. Symbol: ovals, rectangles, or diamonds.", INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+240 );
  ctx.fillText("                              3. Number: one, two, or three symbols. ", INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+265 );
  ctx.fillText("                              4. Shading: solid, open, or striped.", INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+290 );
  ctx.fillText(" In the set below, the cards have different numbers and symbols, and the", INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+315 );
  ctx.fillText("                                   same color and shading.", INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+340 );

  let card1 = deck.card("#0ef691", 'oval', 1, 'striped' );
  let card2 = deck.card("#0ef691", 'rectangle', 2, 'striped' );
  let card3 = deck.card("#0ef691", 'diamond', 3, 'striped' );
  let pos1 = {x: INSTRUCTIONS_POS.x+200, y: INSTRUCTIONS_POS.y+365};
  let pos2 = {x: INSTRUCTIONS_POS.x+200 + (CARD_SIZE.x+CARD_MARGIN.x)*1/2, y: INSTRUCTIONS_POS.y+365};
  let pos3 = {x: INSTRUCTIONS_POS.x+200+(CARD_SIZE.x+CARD_MARGIN.x)*1/2*2, y: INSTRUCTIONS_POS.y+365};

  drawCard(pos1, 1/2, "white");
  drawSymbols(card1, pos1, 1/2); 
  drawCard(pos2, 1/2, "white");
  drawSymbols(card2, pos2, 1/2); 
  drawCard(pos3, 1/2, "white");
  drawSymbols(card3, pos3, 1/2); 

  ctx.fillStyle = "#514e4f";
  ctx.fillText("    And this next set has different numbers, symbols, colors and shading.", INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+470 );

  let card4 = deck.card("#0ef691", 'oval', 1, 'striped' );
  let card5 = deck.card("#fb4c4d", 'rectangle', 2, 'solid' );
  let card6 = deck.card("#62a6e0", 'diamond', 3, 'open' );
  let pos4 = {x: INSTRUCTIONS_POS.x+200, y: INSTRUCTIONS_POS.y+495};
  let pos5 = {x: INSTRUCTIONS_POS.x+200 + (CARD_SIZE.x+CARD_MARGIN.x)*1/2, y: INSTRUCTIONS_POS.y+495};
  let pos6 = {x: INSTRUCTIONS_POS.x+200+(CARD_SIZE.x+CARD_MARGIN.x)*1/2*2, y: INSTRUCTIONS_POS.y+495};

  drawCard(pos4, 1/2, "white");
  drawSymbols(card4, pos4, 1/2); 
  drawCard(pos5, 1/2, "white");
  drawSymbols(card5, pos5, 1/2); 
  drawCard(pos6, 1/2, "white");
  drawSymbols(card6, pos6, 1/2); 

  ctx.fillStyle = "#514e4f";
  ctx.fillText("                         The game ends when you find ten sets.", INSTRUCTIONS_POS.x+10, INSTRUCTIONS_POS.y+600 );
}

handleShowInstructions=(cx, cy)=>{
  
  if(cx >= INSTRUCTIONS_BUTTON_POS.x && cx <= INSTRUCTIONS_BUTTON_POS.x + SUBMIT_SIZE.x &&
    cy >= INSTRUCTIONS_BUTTON_POS.y && cy <= INSTRUCTIONS_BUTTON_POS.y+SUBMIT_SIZE.y){
      drawButton(INSTRUCTIONS_BUTTON_POS, "Instructions", {x: 23, y: 21}, "#d2cecf");
      setTimeout(  drawInstructions, 100);
  }

}

handleCloseInstructions=(cx, cy)=>{
  if( (cx >= CLOSE_INSTRUCTIONS_POS.x && cx <= CLOSE_INSTRUCTIONS_POS.x + CLOSE_INSTRUCTIONS_SIZE.x &&
    cy >= CLOSE_INSTRUCTIONS_POS.y && cy <= CLOSE_INSTRUCTIONS_POS.y+CLOSE_INSTRUCTIONS_SIZE.y) ||
    ( cx < INSTRUCTIONS_POS.x ) || (cx > INSTRUCTIONS_POS.x + INSTRUCTIONS_SIZE.x)
    ){ 
      instructionsShowing = false;
      ctx.beginPath();
      renderBackground();
      renderBoard();
      highlightSelected();
      drawOutOfPlayCards();
    }
}

handleDealThreeMore=(cx, cy)=>{
  if(cx >= DEAL_THREE_MORE_POS.x && cx <= DEAL_THREE_MORE_POS.x + SUBMIT_SIZE.x &&
    cy >= DEAL_THREE_MORE_POS.y && cy <= DEAL_THREE_MORE_POS.y+SUBMIT_SIZE.y){
    drawButton(DEAL_THREE_MORE_POS, "Deal Three More", {x: 5, y: 21}, "#d2cecf");
    setTimeout(  function(){drawButton(DEAL_THREE_MORE_POS, "Deal Three More", {x: 5, y: 21}, "gray")}, 100);


    if(deck.faceUpCount <=12 ){
      for (let i = 0; i < 15; i++) {
        if(deck.faceUpCards[i].symbol === undefined){
          const pos = {x: IN_SET.x+Math.floor(i/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(i%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
            drawCard(pos, 1, "white");
            drawSymbols(deck.dealCard(i), pos, 1); 
        }
      }
      showNumberOfMoves();
    }
  }
}

handleShowMove=(cx, cy)=>{
  if(cx >= SHOW_MOVE_POS.x && cx <= SHOW_MOVE_POS.x + SUBMIT_SIZE.x &&
    cy >= SHOW_MOVE_POS.y && cy <= SHOW_MOVE_POS.y+SUBMIT_SIZE.y){
      drawButton(SHOW_MOVE_POS, "Show Move", {x: 25, y: 21}, "#d2cecf");
      setTimeout(  function(){drawButton(SHOW_MOVE_POS, "Show Move", {x: 25, y: 21}, "gray")}, 100);
      renderBoard();
      let selections = game.findAllValidSelections(deck.faceUpCards);
      if(selections.length > 0){
        showCount +=1;
        selectIndex = showCount%(selections.length);
        selections[selectIndex].forEach(card =>{
          idx = deck.faceUpCards.indexOf(card);
          const pos = {x: IN_SET.x+Math.floor(idx/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(idx%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
          // highlightCard(pos);
        })
        deck.selected = selections[selectIndex];
        highlightSelected();
      }
      
    }
  }




renderBoard=()=>{
  for (let i = 0; i < 15; i++) {
    const pos = {x: IN_SET.x+Math.floor(i/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(i%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
    drawCard(pos, 1, "white");
    drawSymbols(deck.faceUpCards[i], pos, 1);
  }
}

handleNewGame=(cx, cy)=>{
  if(cx >= NEW_GAME_POS.x && cx <= NEW_GAME_POS.x + SUBMIT_SIZE.x &&
    cy >= NEW_GAME_POS.y && cy <= NEW_GAME_POS.y+SUBMIT_SIZE.y){
      drawButton(NEW_GAME_POS, "New Game", {x: 30, y: 21}, "#d2cecf");
      window.setTimeout(  function(){
        drawButton(NEW_GAME_POS, "New Game", {x: 30, y: 21}, "gray");
        newGame();

      }, 100);
  }
}

newGame=()=>{
  score = 0;

  renderBackground();
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

renderBackground=()=>{
  ctx.fillStyle = "#e59fb8";
  ctx.fillRect(0, 0, canvas.width, 50);
  ctx.strokeStyle = "#e59fb8";

  ctx.fillRect(0, 560, canvas.width, window.innerHeight);

  ctx.fillStyle = "#f8cdbf";
  ctx.fillRect(0, 50, canvas.width, 510 );
  ctx.fillStyle = "#BDF3FF";

  ctx.fillRect(IN_SET.x/2, IN_SET.y-15, OUT_OF_PLAY_POS.x+(1/3)*CARD_SIZE.x*6+(1/3)*CARD_MARGIN.x*4+IN_SET.x/2+20, 3*CARD_SIZE.y+2*CARD_MARGIN.y+40)
  ctx.rect(IN_SET.x/2, IN_SET.y-15, 
    OUT_OF_PLAY_POS.x+(1/3)*CARD_SIZE.x*6+(1/3)*CARD_MARGIN.x*4+IN_SET.x/2+20, 3*CARD_SIZE.y+2*CARD_MARGIN.y+40 );
  ctx.stroke();

  ctx.fillStyle = "#BDF3FF";
  ctx.font = "60px Georgia";
  ctx.fillText("SET", 300, 50);

  ctx.font = "40px Georgia";
  ctx.fillText("by Najja Kossally", 650, 50);
  drawButtons(); 
}


window.onload = function() {
  newGame();
  showNumberOfMoves();
}

showNumberOfMoves=()=>{
  drawButton(SHOW_VALID_POS, `Valid Moves: ${game.findAllValidSelections(deck.faceUpCards).length}`, {x: 13, y: 22}, "gray");
}

drawOutOfPlayCards=()=>{
  for (let i = 0; i < deck.outOfPlayCards.length; i++) {
    scale = 1/3;
    let column = Math.floor(i/15)* ((CARD_SIZE.x+CARD_MARGIN.x)*scale*3+5);
    let pos = {x: OUT_OF_PLAY_POS.x+(i%3)*(CARD_SIZE.x+CARD_MARGIN.x)*scale +column, y: OUT_OF_PLAY_POS.y+(Math.floor(i/3)%5)*(CARD_SIZE.y+CARD_MARGIN.y)*scale}
    drawCard(pos, scale, "white");
    drawSymbols(deck.outOfPlayCards[i] , pos, scale);
  }
}

showScore=()=>{
  drawButton(SCORE_POS, `Score: ${score}`, {x: 42, y: 22}, "gray");
}

drawButtons=()=>{
  showScore();
  drawButton(SUBMIT_POS, "Submit", {x: 42, y: 22}, "gray");
  drawButton(DEAL_THREE_MORE_POS, "Deal Three More", {x: 5, y: 21}, "gray");
  drawButton(NEW_GAME_POS, "New Game", {x: 30, y: 21}, "gray");
  drawButton(INSTRUCTIONS_BUTTON_POS, "Instructions", {x: 23, y: 21}, "gray");
  drawButton(SHOW_MOVE_POS, "Show Move", {x: 25, y: 21}, "gray");
  showNumberOfMoves();
}




