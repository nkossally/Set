/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/deck.js":
/*!*********************!*\
  !*** ./lib/deck.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var COLORS = ['#fb4c4d', '#0ef691', '#62a6e0'];
var SYMBOL = ['oval', 'rectangle', 'diamond'];
var NUMBER = [1, 2, 3];
var SHADING = ['solid', 'open', 'striped'];

var Deck =
/*#__PURE__*/
function () {
  function Deck() {
    _classCallCheck(this, Deck);

    this.pile = [];
    this.faceUpCards = [];
    this.faceUpCount = 0;
    this.selected = [];
    this.outOfPlayCards = [];
    this.dealCard = this.dealCard.bind(this);
    this.createDeck = this.createDeck.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.dealNullCard = this.dealNullCard.bind(this);
  }

  _createClass(Deck, [{
    key: "card",
    value: function card(color, symbol, number, shading) {
      return {
        color: color,
        symbol: symbol,
        number: number,
        shading: shading
      };
    }
  }, {
    key: "createDeck",
    value: function createDeck() {
      for (var i = 0; i < COLORS.length; i++) {
        for (var j = 0; j < SYMBOL.length; j++) {
          for (var k = 0; k < NUMBER.length; k++) {
            for (var l = 0; l < SHADING.length; l++) {
              this.pile.push(this.card(COLORS[i], SYMBOL[j], NUMBER[k], SHADING[l]));
            }
          }
        }
      }
    }
  }, {
    key: "dealCard",
    value: function dealCard(idx) {
      // if(this.faceUpCards[idx] && this.faceUpCards[idx].symbol !== undefined){
      //     return this.faceUpCards[idx];
      // }
      if (this.pile.length > 0) {
        idxPile = Math.floor(Math.random() * (this.pile.length - 1));
        this.faceUpCards[idx] = this.pile[idxPile];
        this.faceUpCount += 1;
        this.pile.splice(idxPile, 1);
        return this.faceUpCards[idx];
      } else {
        return this.dealNullCard(idx);
      }
    }
  }, {
    key: "dealNullCard",
    value: function dealNullCard(idx) {
      var nullCard = this.card(undefined, undefined, undefined, undefined);
      this.faceUpCards[idx] = nullCard;
      return nullCard;
    }
  }, {
    key: "removeCard",
    value: function removeCard(card) {
      this.outOfPlayCards.push(card); // this.selected.splice(this.selected.indexOf(card), 1);

      idx = this.faceUpCards.indexOf(card);
      this.faceUpCount -= 1;

      if (this.faceUpCount < 12) {
        this.dealCard(idx);
      } else {
        this.dealNullCard(idx);
      }

      return idx;
    }
  }]);

  return Deck;
}();

module.exports = Deck;

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game() {
    _classCallCheck(this, Game);
  }

  _createClass(Game, [{
    key: "isValidSelection",
    value: function isValidSelection(selection) {
      return selection.length === 3 && this.validColors(selection) && this.validNumbers(selection) && this.validShading(selection) && this.validSymbols(selection);
    }
  }, {
    key: "validColors",
    value: function validColors(selection) {
      testOne = selection[0].color === selection[1].color && selection[0].color === selection[2].color;
      testTwo = selection[0].color !== selection[1].color && selection[0].color !== selection[2].color && selection[1].color !== selection[2].color;
      testThree = selection[0].color !== undefined && selection[1].color !== undefined && selection[2].color !== undefined;
      return (testOne || testTwo) && testThree;
    }
  }, {
    key: "validShading",
    value: function validShading(selection) {
      testOne = selection[0].shading === selection[1].shading && selection[0].shading === selection[2].shading;
      testTwo = selection[0].shading !== selection[1].shading && selection[0].shading !== selection[2].shading && selection[1].shading !== selection[2].shading;
      return testOne || testTwo;
    }
  }, {
    key: "validNumbers",
    value: function validNumbers(selection) {
      testOne = selection[0].number === selection[1].number && selection[0].number === selection[2].number;
      testTwo = selection[0].number !== selection[1].number && selection[0].number !== selection[2].number && selection[1].number !== selection[2].number;
      return testOne || testTwo;
    }
  }, {
    key: "validSymbols",
    value: function validSymbols(selection) {
      testOne = selection[0].symbol === selection[1].symbol && selection[0].symbol === selection[2].symbol;
      testTwo = selection[0].symbol !== selection[1].symbol && selection[0].symbol !== selection[2].symbol && selection[1].symbol !== selection[2].symbol;
      return testOne || testTwo;
    }
  }, {
    key: "findAllValidSelections",
    value: function findAllValidSelections(faceUpCards) {
      validSelections = [];

      for (var i = 0; i < faceUpCards.length - 2; i++) {
        for (var j = i + 1; j < faceUpCards.length - 1; j++) {
          for (var k = j + 1; k < faceUpCards.length; k++) {
            if (i !== j && i !== k && j !== k) {
              var selection = [faceUpCards[i], faceUpCards[j], faceUpCards[k]];

              if (this.isValidSelection(selection)) {
                validSelections.push(selection);
              }
            }
          }
        }
      }

      return validSelections;
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Deck = __webpack_require__(/*! ./deck.js */ "./lib/deck.js");

var Game = __webpack_require__(/*! ./game.js */ "./lib/game.js");

var showCount = 0;
var score = 0;
var instructionsShowing = false;
var background = new Image();
background.src = './assets/images/escher.png';
var canvasBackground = document.createElement("canvas");
var ctxBackground = canvasBackground.getContext("2d");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var CARD_SIZE = {
  x: 100 * 130 / 140,
  y: 140 * 130 / 140
};
var SYMBOL_SIZE = CARD_SIZE.y * 3 / 14;
var IN_SET = {
  x: 10,
  y: 80
};
var CARD_MARGIN = {
  x: 20,
  y: 30
};
var SUBMIT_SIZE = {
  x: 150,
  y: 30
};
var SCORE_POS = {
  x: IN_SET.x + 5 * (CARD_SIZE.x + CARD_MARGIN.x),
  y: IN_SET.y
};
var SUBMIT_POS = {
  x: SCORE_POS.x,
  y: SCORE_POS.y + SUBMIT_SIZE.y + 30
};
var DEAL_THREE_MORE_POS = {
  x: SUBMIT_POS.x,
  y: SUBMIT_POS.y + SUBMIT_SIZE.y + 30
};
var SHOW_MOVE_POS = {
  x: DEAL_THREE_MORE_POS.x,
  y: DEAL_THREE_MORE_POS.y + SUBMIT_SIZE.y + 30
};
var SHOW_VALID_POS = {
  x: SHOW_MOVE_POS.x,
  y: SHOW_MOVE_POS.y + SUBMIT_SIZE.y + 30
};
var INSTRUCTIONS_BUTTON_POS = {
  x: SHOW_VALID_POS.x,
  y: SHOW_VALID_POS.y + SUBMIT_SIZE.y + 30
};
var NEW_GAME_POS = {
  x: INSTRUCTIONS_BUTTON_POS.x,
  y: INSTRUCTIONS_BUTTON_POS.y + SUBMIT_SIZE.y + 30
};
var INSTRUCTIONS_POS = {
  x: IN_SET.x + 2 * CARD_SIZE.x + 1.5 * CARD_MARGIN.x,
  y: 2
};
var INSTRUCTIONS_SIZE = {
  x: 600,
  y: canvas.height
};
var CLOSE_INSTRUCTIONS_POS = {
  x: INSTRUCTIONS_POS.x + INSTRUCTIONS_SIZE.x - 40,
  y: 10
};
var CLOSE_INSTRUCTIONS_SIZE = {
  x: 20,
  y: 20
};
var OUT_OF_PLAY_POS = {
  x: SUBMIT_POS.x + SUBMIT_SIZE.x + CARD_MARGIN.x,
  y: IN_SET.y
};
var YOU_WIN_POS = {
  x: 195,
  y: 250
};
var YOU_WIN_SIZE = {
  x: 300,
  y: 300
};
deck = new Deck();
game = new Game();
deck.createDeck();
var canvasPattern = document.createElement("canvas");
var ctxPattern = canvasPattern.getContext("2d");
canvasPattern.width = 10;
canvasPattern.height = 10;
ctxPattern.beginPath();
ctxPattern.moveTo(10, 10);
ctxPattern.lineTo(0, 0);
ctxPattern.closePath();
canvas.addEventListener("click", handleClick);

drawRoundedRec = function drawRoundedRec(pos, width, length, radius, color) {
  ctx.beginPath();
  ctx.moveTo(pos.x + radius, pos.y);
  ctx.lineTo(pos.x + width - radius, pos.y, radius);
  ctx.arcTo(pos.x + width, pos.y, pos.x + width, pos.y + radius, radius);
  ctx.lineTo(pos.x + width, pos.y + length - radius);
  ctx.arcTo(pos.x + width, pos.y + length, pos.x + width - radius, pos.y + length, radius);
  ctx.lineTo(pos.x + radius, pos.y + length);
  ctx.arcTo(pos.x, pos.y + length, pos.x, pos.y + length - radius, radius);
  ctx.lineTo(pos.x, pos.y + radius);
  ctx.arcTo(pos.x, pos.y, pos.x + radius, pos.y, radius);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

drawButton = function drawButton(pos, text, textPos, color) {
  drawRoundedRec(pos, SUBMIT_SIZE.x, SUBMIT_SIZE.y, SUBMIT_SIZE.x / 10, color);
  ctx.fillStyle = "white";
  ctx.font = "19px Georgia";
  ctx.fillText(text, pos.x + textPos.x, pos.y + textPos.y);
}; // ctx.fillStyle = "white";
// ctx.fillRect(100, 100, 5, 5);  


animateDrawCard = function (_animateDrawCard) {
  function animateDrawCard(_x, _x2, _x3, _x4, _x5, _x6) {
    return _animateDrawCard.apply(this, arguments);
  }

  animateDrawCard.toString = function () {
    return _animateDrawCard.toString();
  };

  return animateDrawCard;
}(function (pos, startScale, endScale, color, card, direction) {
  if (startScale !== endScale) {
    drawCard(pos, startScale, color, card);
    direction === "increase" ? startScale += .50 : startScale -= .50;
    requestAnimationFrame(function () {
      animateDrawCard(pos, startScale, endScale, color, card, direction);
    });
  }
});

drawCard = function drawCard(pos, scale, color, card) {
  if (scale >= 0) {
    clearCard(pos);
    drawRoundedRec(pos, CARD_SIZE.x * scale, CARD_SIZE.y * scale, CARD_SIZE.x * scale / 10, color);
    ctx.strokeStyle = "#f8cdbf";
    ctx.stroke();
    if (card) drawSymbols(card, pos, scale);
  }
};

drawDiamond = function drawDiamond(card, pos, scale) {
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y + SYMBOL_SIZE * scale / 2);
  ctx.lineTo(pos.x + SYMBOL_SIZE * scale, pos.y);
  ctx.lineTo(pos.x + 2 * SYMBOL_SIZE * scale, pos.y + SYMBOL_SIZE * scale / 2);
  ctx.lineTo(pos.x + SYMBOL_SIZE * scale, pos.y + SYMBOL_SIZE * scale);
  ctx.lineTo(pos.x, pos.y + SYMBOL_SIZE * scale / 2);
  ctx.closePath();
  colorSymbols(card);
};

drawOval = function drawOval(card, pos, scale) {
  ctx.beginPath();
  ctx.ellipse(pos.x + SYMBOL_SIZE * scale, pos.y + SYMBOL_SIZE * scale / 2, SYMBOL_SIZE * scale, SYMBOL_SIZE * scale / 2, 0, 0, 2 * Math.PI);
  ctx.closePath();
  colorSymbols(card);
};

drawRectangle = function drawRectangle(card, pos, scale) {
  ctx.beginPath();
  ctx.rect(pos.x, pos.y, 2 * SYMBOL_SIZE * scale, SYMBOL_SIZE * scale);
  ctx.closePath();
  colorSymbols(card);
};

colorSymbols = function colorSymbols(card) {
  ctx.fillStyle = card.color;
  ctx.strokeStyle = card.color;
  if (card.shading === "open") ctx.stroke();
  if (card.shading === "solid") ctx.fill();

  if (card.shading === "striped") {
    ctxPattern.strokeStyle = card.color;
    ctxPattern.stroke();
    ctx.fillStyle = ctx.createPattern(canvasPattern, "repeat");
    ctx.stroke();
    ctx.fill();
  }
}; // animateDrawSymbols=(card, pos, startScale, endScale)=>{
//   if(startScale !== 1){
//     startScale += .;
//     drawSymbols(card, pos, startScale);
//     requestAnimationFrame(function(){animateDrawCard(card, pos, startScale, endScale)});
//   }
// }


drawSymbols = function drawSymbols(card, pos, scale) {
  if (card.symbol === undefined) {
    ctx.globalAlpha = .5;
    drawCard(pos, scale, ctx.createPattern(background, "repeat"));
    ctx.globalAlpha = 1;
  }

  if (card.symbol === "rectangle") drawRectangles(card, pos, scale);
  if (card.symbol === "diamond") drawDiamonds(card, pos, scale);
  if (card.symbol === "oval") drawOvals(card, pos, scale);
};

drawRectangles = function drawRectangles(card, pos, scale) {
  if (card.number === 1) {
    drawRectangle(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 11 / 6
    }, scale);
  } else if (card.number === 2) {
    drawRectangle(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 7 / 6
    }, scale);
    drawRectangle(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 15 / 6
    }, scale);
  } else {
    drawRectangle(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale / 2
    }, scale);
    drawRectangle(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 11 / 6
    }, scale);
    drawRectangle(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 19 / 6
    }, scale);
  }
};

drawOvals = function drawOvals(card, pos, scale) {
  if (card.number === 1) {
    drawOval(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 11 / 6
    }, scale);
  } else if (card.number === 2) {
    drawOval(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 7 / 6
    }, scale);
    drawOval(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 15 / 6
    }, scale);
  } else {
    drawOval(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale / 2
    }, scale);
    drawOval(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 11 / 6
    }, scale);
    drawOval(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 19 / 6
    }, scale);
  }
};

drawDiamonds = function drawDiamonds(card, pos, scale) {
  if (card.number === 1) {
    drawDiamond(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 11 / 6
    }, scale);
  } else if (card.number === 2) {
    drawDiamond(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 7 / 6
    }, scale);
    drawDiamond(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 15 / 6
    }, scale);
  } else {
    drawDiamond(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale / 2
    }, scale);
    drawDiamond(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 11 / 6
    }, scale);
    drawDiamond(card, {
      x: pos.x + SYMBOL_SIZE * scale * 2 / 3,
      y: pos.y + SYMBOL_SIZE * scale * 19 / 6
    }, scale);
  }
};

function handleClick(event) {
  cx = event.pageX;
  cy = event.pageY;

  if (instructionsShowing) {
    handleCloseInstructions(cx, cy);
  } else if (score < 10) {
    handleShowInstructions(cx, cy);
    handleSelect(cx, cy);
    handleSubmit(cx, cy);
    handleDealThreeMore(cx, cy);
    handleShowMove(cx, cy);
    handleNewGame(cx, cy);
  } else {
    handleNewGame(cx, cy);
  }
}

handleSelect = function handleSelect(cx, cy) {
  for (var i = 0; i < 15; i++) {
    var pos = {
      x: IN_SET.x + Math.floor(i / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
      y: IN_SET.y + i % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
    };

    if (cx >= pos.x && cx <= pos.x + CARD_SIZE.x && cy >= pos.y && cy <= pos.y + CARD_SIZE.y) {
      var card = deck.faceUpCards[i];

      if (card && card.symbol !== undefined) {
        if (deck.selected.includes(card)) {
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
        var _idx = deck.faceUpCards.indexOf(deck.selected[2]);

        var oldPos = {
          x: IN_SET.x + Math.floor(_idx / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
          y: IN_SET.y + _idx % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
        };
        deck.selected.splice(2, 1); // ctx.clearRect(oldPos.x, oldPos.y, CARD_SIZE.x, CARD_SIZE.y);
        // drawCard(oldPos, 1, "white");
        // drawSymbols(deck.faceUpCards[idx], oldPos, 1);

        renderBoard();
        highlightSelected();
      }

      break;
    }
  }
};

handleSubmit = function handleSubmit(cx, cy) {
  if (cx >= SUBMIT_POS.x && cx <= SUBMIT_POS.x + SUBMIT_SIZE.x && cy >= SUBMIT_POS.y && cy <= SUBMIT_POS.y + SUBMIT_SIZE.y) {
    drawButton(SUBMIT_POS, "Submit", {
      x: 42,
      y: 22
    }, "#d2cecf");
    window.setTimeout(function () {
      drawButton(SUBMIT_POS, "Submit", {
        x: 42,
        y: 22
      }, "gray");
    }, 100);

    if (deck.selected.length === 3) {
      if (game.isValidSelection(deck.selected)) {
        deck.selected.forEach(function (card) {
          var idx = deck.removeCard(card);
          var pos = {
            x: IN_SET.x + Math.floor(idx / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
            y: IN_SET.y + idx % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
          }; // animateDrawCard(pos, 0, 1, "white");          

          animateDrawCard(pos, 1, 0, "white", card, "decrease");
          setTimeout(function () {
            animateDrawCard(pos, 0, 1, "white", deck.faceUpCards[idx], "increase");
          }, 30);
          setTimeout(function () {
            afterCardAnimation(card, pos, 1);
          }, 55);
        });
        deck.selected = [];
        renderBoard();
        score += 1;
        drawOutOfPlayCards();
        showNumberOfMoves();
        showScore();
        setTimeout(function () {
          if (score === 10) showWin();
        }, 100);
      }
    }
  }
};

showWin = function showWin() {
  ctx.fillStyle = "#ebad07";
  ctx.font = "100px Georgia";
  ctx.fillText("You", YOU_WIN_POS.x, YOU_WIN_POS.y);
  ctx.fillText("win!", YOU_WIN_POS.x - 5, YOU_WIN_POS.y + 100);
  ctx.font = "20px Georgia";
  ctx.fillText("Click New Game to start a new game!", YOU_WIN_POS.x - 80, YOU_WIN_POS.y + 150);
};

highlightCard = function highlightCard(pos, color) {
  ctx.globalAlpha = .3;
  drawRoundedRec(pos, CARD_SIZE.x, CARD_SIZE.y, CARD_SIZE.x / 10, color);
  ctx.globalAlpha = 1;
};

highlightSelected = function highlightSelected() {
  var color = game.isValidSelection(deck.selected) ? "#07eb1d" : "yellow";
  deck.selected.forEach(function (card) {
    idx = deck.faceUpCards.indexOf(card);
    var pos = {
      x: IN_SET.x + Math.floor(idx / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
      y: IN_SET.y + idx % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
    };
    highlightCard(pos, color);
  });
};

drawInstructions = function drawInstructions() {
  drawButton(INSTRUCTIONS_BUTTON_POS, "Instructions", {
    x: 23,
    y: 21
  }, "gray");
  ctx.fillStyle = "gray";
  ctx.globalAlpha = .5;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  instructionsShowing = true;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#BDF3FF";
  ctx.strokeStyle = "#847b7e";
  ctx.fillRect(INSTRUCTIONS_POS.x, INSTRUCTIONS_POS.y, INSTRUCTIONS_SIZE.x, INSTRUCTIONS_SIZE.y);
  ctx.beginPath();
  ctx.rect(INSTRUCTIONS_POS.x, INSTRUCTIONS_POS.y, INSTRUCTIONS_SIZE.x, INSTRUCTIONS_SIZE.y);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.fillRect(CLOSE_INSTRUCTIONS_POS.x, CLOSE_INSTRUCTIONS_POS.y, CLOSE_INSTRUCTIONS_SIZE.x, CLOSE_INSTRUCTIONS_SIZE.y);
  ctx.fillStyle = "white";
  ctx.font = "19px Georgia";
  ctx.fillText("x", CLOSE_INSTRUCTIONS_POS.x + 6, CLOSE_INSTRUCTIONS_POS.y + 15);
  ctx.fillStyle = "#514e4f";
  ctx.fillText("                                               Instructions:", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 50);
  ctx.font = "18px Georgia";
  ctx.fillText("   The object of each round of Set is to find a ‘set’ of three cards from the", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 90);
  ctx.fillText("      available face up cards. Each card has four features (color, symbol,", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 115);
  ctx.fillText("   number and shading). In a proper ‘set,’ for each feature, all three cards", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 140);
  ctx.fillText("     have the same variation of the feature, or different variations of the", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 165);
  ctx.fillText("                feature. The variations of each feature are as follows:", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 190);
  ctx.fillText("                              1. Color: red, green, or blue.", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 215);
  ctx.fillText("                              2. Symbol: ovals, rectangles, or diamonds.", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 240);
  ctx.fillText("                              3. Number: one, two, or three symbols. ", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 265);
  ctx.fillText("                              4. Shading: solid, open, or striped.", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 290);
  ctx.fillText(" In the set below, the cards have different numbers and symbols, and the", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 315);
  ctx.fillText("                                   same color and shading.", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 340);
  var card1 = deck.card("#0ef691", 'oval', 1, 'striped');
  var card2 = deck.card("#0ef691", 'rectangle', 2, 'striped');
  var card3 = deck.card("#0ef691", 'diamond', 3, 'striped');
  var pos1 = {
    x: INSTRUCTIONS_POS.x + 200,
    y: INSTRUCTIONS_POS.y + 365
  };
  var pos2 = {
    x: INSTRUCTIONS_POS.x + 200 + (CARD_SIZE.x + CARD_MARGIN.x) * 1 / 2,
    y: INSTRUCTIONS_POS.y + 365
  };
  var pos3 = {
    x: INSTRUCTIONS_POS.x + 200 + (CARD_SIZE.x + CARD_MARGIN.x) * 1 / 2 * 2,
    y: INSTRUCTIONS_POS.y + 365
  };
  drawCard(pos1, 1 / 2, "white", card1);
  drawCard(pos2, 1 / 2, "white", card2);
  drawCard(pos3, 1 / 2, "white", card3);
  ctx.fillStyle = "#514e4f";
  ctx.fillText("    And this next set has different numbers, symbols, colors and shading.", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 470);
  var card4 = deck.card("#0ef691", 'oval', 1, 'striped');
  var card5 = deck.card("#fb4c4d", 'rectangle', 2, 'solid');
  var card6 = deck.card("#62a6e0", 'diamond', 3, 'open');
  var pos4 = {
    x: INSTRUCTIONS_POS.x + 200,
    y: INSTRUCTIONS_POS.y + 495
  };
  var pos5 = {
    x: INSTRUCTIONS_POS.x + 200 + (CARD_SIZE.x + CARD_MARGIN.x) * 1 / 2,
    y: INSTRUCTIONS_POS.y + 495
  };
  var pos6 = {
    x: INSTRUCTIONS_POS.x + 200 + (CARD_SIZE.x + CARD_MARGIN.x) * 1 / 2 * 2,
    y: INSTRUCTIONS_POS.y + 495
  };
  drawCard(pos4, 1 / 2, "white", card4);
  drawCard(pos5, 1 / 2, "white", card5);
  drawCard(pos6, 1 / 2, "white", card6);
  ctx.fillStyle = "#514e4f";
  ctx.fillText("                         The game ends when you find ten sets.", INSTRUCTIONS_POS.x + 10, INSTRUCTIONS_POS.y + 600);
};

handleShowInstructions = function handleShowInstructions(cx, cy) {
  if (cx >= INSTRUCTIONS_BUTTON_POS.x && cx <= INSTRUCTIONS_BUTTON_POS.x + SUBMIT_SIZE.x && cy >= INSTRUCTIONS_BUTTON_POS.y && cy <= INSTRUCTIONS_BUTTON_POS.y + SUBMIT_SIZE.y) {
    drawButton(INSTRUCTIONS_BUTTON_POS, "Instructions", {
      x: 23,
      y: 21
    }, "#d2cecf");
    setTimeout(drawInstructions, 100);
  }
};

handleCloseInstructions = function handleCloseInstructions(cx, cy) {
  if (cx >= CLOSE_INSTRUCTIONS_POS.x && cx <= CLOSE_INSTRUCTIONS_POS.x + CLOSE_INSTRUCTIONS_SIZE.x && cy >= CLOSE_INSTRUCTIONS_POS.y && cy <= CLOSE_INSTRUCTIONS_POS.y + CLOSE_INSTRUCTIONS_SIZE.y || cx < INSTRUCTIONS_POS.x || cx > INSTRUCTIONS_POS.x + INSTRUCTIONS_SIZE.x) {
    instructionsShowing = false;
    ctx.beginPath();
    renderBackground();
    renderBoard();
    highlightSelected();
    drawOutOfPlayCards();
  }
};

afterCardAnimation = function afterCardAnimation(card, pos, scale) {
  drawSymbols(card, pos, scale);
  renderBackground();
  renderBoard();
  drawOutOfPlayCards();
  highlightSelected();
};

clearCard = function clearCard(pos) {
  drawRoundedRec({
    x: pos.x - 1,
    y: pos.y - 1
  }, CARD_SIZE.x + 2, CARD_SIZE.y + 2, CARD_SIZE.x / 10, "#BDF3FF");
};

handleDealThreeMore = function handleDealThreeMore(cx, cy) {
  if (cx >= DEAL_THREE_MORE_POS.x && cx <= DEAL_THREE_MORE_POS.x + SUBMIT_SIZE.x && cy >= DEAL_THREE_MORE_POS.y && cy <= DEAL_THREE_MORE_POS.y + SUBMIT_SIZE.y) {
    drawButton(DEAL_THREE_MORE_POS, "Deal Three More", {
      x: 5,
      y: 21
    }, "#d2cecf");
    setTimeout(function () {
      drawButton(DEAL_THREE_MORE_POS, "Deal Three More", {
        x: 5,
        y: 21
      }, "gray");
    }, 100);

    if (deck.faceUpCount <= 12) {
      for (var i = 0; i < 15; i++) {
        if (deck.faceUpCards[i].symbol === undefined) {
          (function () {
            var pos = {
              x: IN_SET.x + Math.floor(i / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
              y: IN_SET.y + i % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
            };
            var prevCard = deck.faceUpCards[i];
            var card = deck.dealCard(i);
            animateDrawCard(pos, 1, 0, "white", prevCard, "decrease");
            setTimeout(function () {
              animateDrawCard(pos, 0, 1, "white", card, "increase");
            }, 30); // animateDrawCard(pos, 0, 1, "white", "increase");          

            setTimeout(function () {
              afterCardAnimation(card, pos, 1);
            }, 55);
          })();
        }
      }

      showNumberOfMoves();
    }
  }
};

handleShowMove = function handleShowMove(cx, cy) {
  if (cx >= SHOW_MOVE_POS.x && cx <= SHOW_MOVE_POS.x + SUBMIT_SIZE.x && cy >= SHOW_MOVE_POS.y && cy <= SHOW_MOVE_POS.y + SUBMIT_SIZE.y) {
    drawButton(SHOW_MOVE_POS, "Show Move", {
      x: 25,
      y: 21
    }, "#d2cecf");
    setTimeout(function () {
      drawButton(SHOW_MOVE_POS, "Show Move", {
        x: 25,
        y: 21
      }, "gray");
    }, 100);
    renderBoard();
    var selections = game.findAllValidSelections(deck.faceUpCards);

    if (selections.length > 0) {
      showCount += 1;
      selectIndex = showCount % selections.length;
      selections[selectIndex].forEach(function (card) {
        idx = deck.faceUpCards.indexOf(card);
        var pos = {
          x: IN_SET.x + Math.floor(idx / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
          y: IN_SET.y + idx % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
        }; // highlightCard(pos);
      });
      deck.selected = selections[selectIndex];
      highlightSelected();
    }
  }
};

renderBoard = function renderBoard() {
  for (var i = 0; i < 15; i++) {
    var pos = {
      x: IN_SET.x + Math.floor(i / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
      y: IN_SET.y + i % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
    };
    drawCard(pos, 1, "white", deck.faceUpCards[i]);
  }
};

handleNewGame = function handleNewGame(cx, cy) {
  if (cx >= NEW_GAME_POS.x && cx <= NEW_GAME_POS.x + SUBMIT_SIZE.x && cy >= NEW_GAME_POS.y && cy <= NEW_GAME_POS.y + SUBMIT_SIZE.y) {
    drawButton(NEW_GAME_POS, "New Game", {
      x: 30,
      y: 21
    }, "#d2cecf");
    window.setTimeout(function () {
      drawButton(NEW_GAME_POS, "New Game", {
        x: 30,
        y: 21
      }, "gray");
      newGame();
    }, 100);
  }
};

newGame = function newGame() {
  score = 0;
  renderBackground();
  deck = new Deck();
  game = new Game();
  deck.createDeck();

  for (var i = 0; i < 12; i++) {
    deck.dealCard(i);
  }

  for (var j = 12; j < 15; j++) {
    deck.dealNullCard(j);
  }

  renderBoard();
};

renderBackground = function renderBackground() {
  ctx.fillStyle = "#e59fb8";
  ctx.fillRect(0, 0, canvas.width, 50);
  ctx.strokeStyle = "#e59fb8";
  ctx.fillRect(0, 560, canvas.width, window.innerHeight);
  ctx.fillStyle = "#f8cdbf";
  ctx.fillRect(0, 50, canvas.width, 520);
  ctx.fillStyle = "#BDF3FF";
  ctx.fillRect(IN_SET.x / 2, IN_SET.y - 15, OUT_OF_PLAY_POS.x + 1 / 3 * CARD_SIZE.x * 6 + 1 / 3 * CARD_MARGIN.x * 4 + IN_SET.x / 2 + 20, 3 * CARD_SIZE.y + 2 * CARD_MARGIN.y + 40);
  ctx.rect(IN_SET.x / 2, IN_SET.y - 15, OUT_OF_PLAY_POS.x + 1 / 3 * CARD_SIZE.x * 6 + 1 / 3 * CARD_MARGIN.x * 4 + IN_SET.x / 2 + 20, 3 * CARD_SIZE.y + 2 * CARD_MARGIN.y + 40);
  ctx.stroke();
  ctx.fillStyle = "#BDF3FF";
  ctx.font = "60px Georgia";
  ctx.fillText("SET", 100, 50);
  ctx.font = "40px Georgia";
  ctx.fillText("by Najja Kossally", 450, 50);
  drawButtons();
};

window.onload = function () {
  newGame();
  showNumberOfMoves();
};

showNumberOfMoves = function showNumberOfMoves() {
  drawButton(SHOW_VALID_POS, "Valid Moves: ".concat(game.findAllValidSelections(deck.faceUpCards).length), {
    x: 13,
    y: 22
  }, "gray");
};

drawOutOfPlayCards = function drawOutOfPlayCards() {
  for (var i = 0; i < deck.outOfPlayCards.length; i++) {
    scale = 1 / 3;
    var column = Math.floor(i / 15) * ((CARD_SIZE.x + CARD_MARGIN.x) * scale * 3 + 5);
    var pos = {
      x: OUT_OF_PLAY_POS.x + i % 3 * (CARD_SIZE.x + CARD_MARGIN.x) * scale + column,
      y: OUT_OF_PLAY_POS.y + Math.floor(i / 3) % 5 * (CARD_SIZE.y + CARD_MARGIN.y) * scale
    };
    drawCard(pos, scale, "white", deck.outOfPlayCards[i]);
  }
};

showScore = function showScore() {
  drawButton(SCORE_POS, "Score: ".concat(score), {
    x: 42,
    y: 22
  }, "gray");
};

drawButtons = function drawButtons() {
  showScore();
  drawButton(SUBMIT_POS, "Submit", {
    x: 42,
    y: 22
  }, "gray");
  drawButton(DEAL_THREE_MORE_POS, "Deal Three More", {
    x: 5,
    y: 21
  }, "gray");
  drawButton(NEW_GAME_POS, "New Game", {
    x: 30,
    y: 21
  }, "gray");
  drawButton(INSTRUCTIONS_BUTTON_POS, "Instructions", {
    x: 23,
    y: 21
  }, "gray");
  drawButton(SHOW_MOVE_POS, "Show Move", {
    x: 25,
    y: 21
  }, "gray");
  showNumberOfMoves();
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map