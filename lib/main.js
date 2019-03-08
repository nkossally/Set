const Deck = require('./deck.js');
const Game = require('./game.js');
const Draw = require('./draw.js');


let showCount = 0;
let score = 0;

let instructionsShowing = false;

let background = new Image();
background.src = './assets/images/escher.png';
let canvasBackground = document.createElement("canvas");
let ctxBackground = canvasBackground.getContext("2d");


  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = Math.max(window.innerWidth, 1500);
  canvas.height = Math.max(window.innerHeight, 800); 


  const CARD_SIZE = {x: 100*130/140, y: 140*130/140};
  const SYMBOL_SIZE = CARD_SIZE.y*3/14;
  const IN_SET = { x: Math.max(window.innerWidth-1040, 0)/2+10, y: 80 };
  const CARD_MARGIN = {x: 20, y: 30};
  const SUBMIT_SIZE = {x: 150, y: 30};
  const SCORE_POS = {x: IN_SET.x+5*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y};
  const SUBMIT_POS = {x: SCORE_POS.x, y: SCORE_POS.y + SUBMIT_SIZE.y+30};
  const DEAL_THREE_MORE_POS = {x: SUBMIT_POS.x, y: SUBMIT_POS.y + SUBMIT_SIZE.y+30};
  const SHOW_MOVE_POS = {x: DEAL_THREE_MORE_POS.x, y: DEAL_THREE_MORE_POS.y+SUBMIT_SIZE.y+30};
  const SHOW_VALID_POS = {x: SHOW_MOVE_POS.x, y: SHOW_MOVE_POS.y+SUBMIT_SIZE.y+30};
  const INSTRUCTIONS_BUTTON_POS= {x: SHOW_VALID_POS.x, y: SHOW_VALID_POS.y + SUBMIT_SIZE.y+30};
  const NEW_GAME_POS = {x: INSTRUCTIONS_BUTTON_POS.x, y: INSTRUCTIONS_BUTTON_POS.y + SUBMIT_SIZE.y+30};
  const INSTRUCTIONS_POS = {x: IN_SET.x+2*CARD_SIZE.x+1.5*CARD_MARGIN.x, y: 51};
  const INSTRUCTIONS_SIZE = {x: 600, y: 650};
  const CLOSE_INSTRUCTIONS_POS = {x: INSTRUCTIONS_POS.x+INSTRUCTIONS_SIZE.x - 40, y: 60};
  const CLOSE_INSTRUCTIONS_SIZE = {x: 20, y: 20};
  const OUT_OF_PLAY_POS = {x: SUBMIT_POS.x+SUBMIT_SIZE.x+CARD_MARGIN.x, y: IN_SET.y};
  const YOU_WIN_POS = {x: 195+IN_SET.x, y:250 }
  // const YOU_WIN_SIZE = {x: 300, y: 300};

let canvasPattern = document.createElement("canvas");
let ctxPattern = canvasPattern.getContext("2d");
canvasPattern.width = 10;
canvasPattern.height = 10;

ctxPattern.beginPath();
ctxPattern.moveTo(10, 10);
ctxPattern.lineTo(0, 0);
ctxPattern.closePath();

deck = new Deck;
game = new Game;
draw = new Draw(ctxPattern, background, canvasPattern);

canvas.addEventListener("click", handleClick);

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
          renderBoard();
          highlightSelected();
        }
      } 
      if (deck.selected.length > 3) {
        const idx = deck.faceUpCards.indexOf(deck.selected[2]);
        const oldPos = {x: IN_SET.x+Math.floor(idx/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(idx%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
        deck.selected.splice(2, 1);
        renderBoard();
        highlightSelected();
      }
      break;
    }
  }
}



handleSubmit=(cx, cy)=>{
  if(cx >= SUBMIT_POS.x && cx <= SUBMIT_POS.x + SUBMIT_SIZE.x &&
    cy >= SUBMIT_POS.y && cy <= SUBMIT_POS.y+SUBMIT_SIZE.y){
    draw.drawButton(ctx, SUBMIT_POS, "Submit", {x: 42, y: 22}, "#d2cecf", SUBMIT_SIZE);
    window.setTimeout(  function(){draw.drawButton(ctx, SUBMIT_POS, "Submit", {x: 42, y: 22}, "gray", SUBMIT_SIZE)}, 100);
    if(deck.selected.length ===3){
      if(game.isValidSelection(deck.selected)){
        deck.selected.forEach(card=> {
          const idx = deck.removeCard(card);
          const pos = {x: IN_SET.x+Math.floor(idx/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(idx%3)*(CARD_SIZE.y+CARD_MARGIN.y)};
          draw.animateDrawCard(ctx, pos, 1, 0, "white", card, "decrease"); 
          setTimeout(  function(){draw.animateDrawCard(ctx, pos, 0, 1, "white", deck.faceUpCards[idx], "increase")}, 30);
         
          setTimeout( function(){afterCardAnimation(card, pos, 1)}, 55);
        });
        deck.selected = [];
        
        renderBoard();
        score +=1;
        drawOutOfPlayCards();

        showNumberOfMoves();
        showScore();
        setTimeout(function(){if(score === 10) showWin()}, 100);
      } else {
        deck.selected = [];
        renderBoard();
      } 
    }
  }
}



showWin=()=>{
  ctx.fillStyle = "#ebad07";
  ctx.font = "100px Georgia";
  
  ctx.fillText("You", YOU_WIN_POS.x, YOU_WIN_POS.y );
  ctx.fillText("win!", YOU_WIN_POS.x-5, YOU_WIN_POS.y+100 );
  ctx.font = "20px Georgia";
  ctx.fillText("Click New Game to start a new game!", YOU_WIN_POS.x-80, YOU_WIN_POS.y+150 );
}

highlightCard=(pos, color)=>{
  ctx.globalAlpha = .3;
  draw.drawRoundedRec(ctx, pos, CARD_SIZE.x, CARD_SIZE.y, CARD_SIZE.x/10, color);

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



handleShowInstructions=(cx, cy)=>{


  
  if(cx >= INSTRUCTIONS_BUTTON_POS.x && cx <= INSTRUCTIONS_BUTTON_POS.x + SUBMIT_SIZE.x &&
    cy >= INSTRUCTIONS_BUTTON_POS.y && cy <= INSTRUCTIONS_BUTTON_POS.y+SUBMIT_SIZE.y){

      draw.drawButton(ctx, INSTRUCTIONS_BUTTON_POS, "Instructions", {x: 23, y: 21}, "#d2cecf", SUBMIT_SIZE);
      instructionsShowing = true;
      setTimeout( function(){draw.drawInstructions(ctx, CARD_MARGIN, INSTRUCTIONS_POS, CLOSE_INSTRUCTIONS_POS, CLOSE_INSTRUCTIONS_SIZE, INSTRUCTIONS_BUTTON_POS, INSTRUCTIONS_SIZE, SUBMIT_SIZE )}, 100);
      const navLinks = document.getElementById("links");
      const card_img = document.getElementById("card");
      card_img.classList.add("dim");    
      navLinks.classList.add("dim");    
  }

}

handleCloseInstructions=(cx, cy)=>{
  if( (cx >= CLOSE_INSTRUCTIONS_POS.x && cx <= CLOSE_INSTRUCTIONS_POS.x + CLOSE_INSTRUCTIONS_SIZE.x &&
    cy >= CLOSE_INSTRUCTIONS_POS.y && cy <= CLOSE_INSTRUCTIONS_POS.y+CLOSE_INSTRUCTIONS_SIZE.y) ||
    ( cx < INSTRUCTIONS_POS.x ) || (cx > INSTRUCTIONS_POS.x + INSTRUCTIONS_SIZE.x) || (cy < INSTRUCTIONS_POS.y)
    ){ 
      const navLinks = document.getElementById("links");
      const card_img = document.getElementById("card");
      card_img.classList.remove("dim");   
      navLinks.classList.remove("dim");


      instructionsShowing = false;
      ctx.beginPath();
      renderBackground();
      renderBoard();
      highlightSelected();
      drawOutOfPlayCards();
    }
}

  afterCardAnimation=(card, pos, scale)=>{
    draw.drawSymbols(ctx, card, pos, scale, background);
    renderBackground();
    renderBoard();
    drawOutOfPlayCards();
    highlightSelected();
  }



handleDealThreeMore=(cx, cy)=>{
  if(cx >= DEAL_THREE_MORE_POS.x && cx <= DEAL_THREE_MORE_POS.x + SUBMIT_SIZE.x &&
    cy >= DEAL_THREE_MORE_POS.y && cy <= DEAL_THREE_MORE_POS.y+SUBMIT_SIZE.y){
    draw.drawButton(ctx, DEAL_THREE_MORE_POS, "Deal Three More", {x: 5, y: 21}, "#d2cecf", SUBMIT_SIZE);

    setTimeout(  function(){draw.drawButton(ctx, DEAL_THREE_MORE_POS, "Deal Three More", {x: 5, y: 21}, "gray", SUBMIT_SIZE)}, 100);

    if(deck.faceUpCount <=12 ){
      for (let i = 0; i < 15; i++) {
        if(deck.faceUpCards[i].symbol === undefined){
          const pos = {x: IN_SET.x+Math.floor(i/3)*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y+(i%3)*(CARD_SIZE.y+CARD_MARGIN.y)};

          let prevCard = deck.faceUpCards[i];
          let card = deck.dealCard(i);
          draw.animateDrawCard(ctx, pos, 1, 0, "white", prevCard, "decrease");          
          setTimeout(  function(){draw.animateDrawCard(ctx, pos, 0, 1, "white", card, "increase")}, 30);
          setTimeout(  function(){afterCardAnimation(card, pos, 1)}, 55);

        }
      }
      showNumberOfMoves();
    }
  }
}

handleShowMove=(cx, cy)=>{
  if(cx >= SHOW_MOVE_POS.x && cx <= SHOW_MOVE_POS.x + SUBMIT_SIZE.x &&
    cy >= SHOW_MOVE_POS.y && cy <= SHOW_MOVE_POS.y+SUBMIT_SIZE.y){
    draw.drawButton(ctx, SHOW_MOVE_POS, "Show Move", {x: 25, y: 21}, "#d2cecf", SUBMIT_SIZE);
    setTimeout(  function(){draw.drawButton(ctx, SHOW_MOVE_POS, "Show Move", {x: 25, y: 21}, "gray", SUBMIT_SIZE)}, 100);
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
    draw.drawCard(ctx, pos, 1, "white", deck.faceUpCards[i], CARD_SIZE, background);
  }
}

handleNewGame=(cx, cy)=>{
  if(cx >= NEW_GAME_POS.x && cx <= NEW_GAME_POS.x + SUBMIT_SIZE.x &&
    cy >= NEW_GAME_POS.y && cy <= NEW_GAME_POS.y+SUBMIT_SIZE.y){
      draw.drawButton(ctx, NEW_GAME_POS, "New Game", {x: 30, y: 21}, "#d2cecf", SUBMIT_SIZE);
      window.setTimeout(  function(){
        draw.drawButton(ctx, NEW_GAME_POS, "New Game", {x: 30, y: 21}, "gray", SUBMIT_SIZE);
        newGame();
        showNumberOfMoves();
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
  ctx.fillRect(0, 50, canvas.width, 520 );
  ctx.fillStyle = "#BDF3FF";
  // ctx.fillRect(IN_SET.x/2, IN_SET.y-15, OUT_OF_PLAY_POS.x+(1/3)*CARD_SIZE.x*6+(1/3)*CARD_MARGIN.x*4+IN_SET.x/2+20, 3*CARD_SIZE.y+2*CARD_MARGIN.y+40)

  ctx.fillRect(IN_SET.x/2, IN_SET.y-15, 1040, 3*CARD_SIZE.y+2*CARD_MARGIN.y+40)
  ctx.rect(IN_SET.x/2, IN_SET.y-15, 
    1040, 3*CARD_SIZE.y+2*CARD_MARGIN.y+40 );
  ctx.stroke();

  ctx.fillStyle = "#BDF3FF";
  ctx.font = "60px Georgia";
  ctx.fillText("SET", 25, 50);

  ctx.font = "40px Georgia";
  ctx.fillText("Najja Kossally", 325, 50);
  drawButtons(); 
}


window.onload = function() {
  newGame();
  showNumberOfMoves();
}

showNumberOfMoves=()=>{
  draw.drawButton(ctx, SHOW_VALID_POS, `Valid Moves: ${game.findAllValidSelections(deck.faceUpCards).length}`, {x: 13, y: 22}, "gray", SUBMIT_SIZE);
}

drawOutOfPlayCards=()=>{
  for (let i = 0; i < deck.outOfPlayCards.length; i++) {
    scale = 1/3;
    let column = Math.floor(i/15)* ((CARD_SIZE.x+CARD_MARGIN.x)*scale*3+5);
    let pos = {x: OUT_OF_PLAY_POS.x+(i%3)*(CARD_SIZE.x+CARD_MARGIN.x)*scale +column, y: OUT_OF_PLAY_POS.y+(Math.floor(i/3)%5)*(CARD_SIZE.y+CARD_MARGIN.y)*scale}
    draw.drawCard(ctx, pos, scale, "white", deck.outOfPlayCards[i], CARD_SIZE, background);

  }
}

showScore=()=>{
  draw.drawButton(ctx, SCORE_POS, `Score: ${score}`, {x: 42, y: 22}, "gray", SUBMIT_SIZE);
}

drawButtons=()=>{
  showScore();
  draw.drawButton(ctx, SUBMIT_POS, "Submit", {x: 42, y: 22}, "gray", SUBMIT_SIZE);
  draw.drawButton(ctx, DEAL_THREE_MORE_POS, "Deal Three More", {x: 5, y: 21}, "gray", SUBMIT_SIZE);
  draw.drawButton(ctx, NEW_GAME_POS, "New Game", {x: 30, y: 21}, "gray", SUBMIT_SIZE);
  draw.drawButton(ctx, INSTRUCTIONS_BUTTON_POS, "Instructions", {x: 23, y: 21}, "gray", SUBMIT_SIZE);
  draw.drawButton(ctx, SHOW_MOVE_POS, "Show Move", {x: 25, y: 21}, "gray", SUBMIT_SIZE);
  showNumberOfMoves();
}





