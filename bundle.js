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

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 4790;
ctx.fillStyle = "#06e4f8";
ctx.fillRect(0, 0, canvas.width, canvas.height);
var CARD_SIZE = {
  x: 100,
  y: 140
};
var SYMBOL_SIZE = CARD_SIZE.y * 3 / 14;
var IN_SET = {
  x: 10,
  y: 10
};
var CARD_MARGIN = {
  x: 20,
  y: 30
}; // const RIGHT_SIDE = {x: IN_SET.x+5*(CARD_SIZE.x+CARD_MARGIN.x), y: IN_SET.y};

var SUBMIT_SIZE = {
  x: 150,
  y: 30
};
var SUBMIT_POS = {
  x: IN_SET.x + 5 * (CARD_SIZE.x + CARD_MARGIN.x),
  y: IN_SET.y
};
var DEAL_THREE_MORE_POS = {
  x: SUBMIT_POS.x,
  y: SUBMIT_POS.y + SUBMIT_SIZE.y + 50
};
var SHOW_VALID_POS = {
  x: DEAL_THREE_MORE_POS.x,
  y: DEAL_THREE_MORE_POS.y + SUBMIT_SIZE.y + 50
};
var NEW_GAME_POS = {
  x: SHOW_VALID_POS.x,
  y: SHOW_VALID_POS.y + SUBMIT_SIZE.y + 50
};
var OUT_OF_PLAY_POS = {
  x: SUBMIT_POS.x + SUBMIT_SIZE.x + CARD_MARGIN.x,
  y: IN_SET.y
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

drawCard = function drawCard(pos, scale) {
  ctx.fillStyle = "white";
  ctx.fillRect(pos.x, pos.y, CARD_SIZE.x * scale, CARD_SIZE.y * scale);
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
};

drawSymbols = function drawSymbols(card, pos, scale) {
  if (card.symbol === undefined) drawNullCard(pos, scale);
  if (card.symbol === "rectangle") drawRectangles(card, pos, scale);
  if (card.symbol === "diamond") drawDiamonds(card, pos, scale);
  if (card.symbol === "oval") drawOvals(card, pos, scale);
};

drawNullCard = function drawNullCard(pos, scale) {};

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
  handleSelect(cx, cy);
  handleSubmit(cx, cy);
  handleDealThreeMore(cx, cy);
  handleShowMove(cx, cy);
  handleNewGame(cx, cy);
}

handleSelect = function handleSelect(cx, cy) {
  for (var i = 0; i < 15; i++) {
    var pos = {
      x: IN_SET.x + Math.floor(i / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
      y: IN_SET.y + i % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
    };

    if (cx >= pos.x && cx <= pos.x + CARD_SIZE.x && cy >= pos.y && cy <= pos.y + CARD_SIZE.y) {
      var card = deck.faceUpCards[i];

      if (card) {
        if (deck.selected.includes(card)) {
          deck.selected.splice(deck.selected.indexOf(card), 1); // ctx.clearRect(pos.x, pos.y, CARD_SIZE.x, CARD_SIZE.y);
          // drawSymbols(card, pos);

          renderBoard();
          highlightSelected();
        } else {
          deck.selected.push(deck.faceUpCards[i]);
          highlightCard(pos);
        }
      }

      if (deck.selected.length > 3) {
        var _idx = deck.faceUpCards.indexOf(deck.selected[2]);

        var oldPos = {
          x: IN_SET.x + Math.floor(_idx / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
          y: IN_SET.y + _idx % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
        };
        deck.selected.splice(2, 1);
        ctx.clearRect(oldPos.x, oldPos.y, CARD_SIZE.x, CARD_SIZE.y);
        drawSymbols(deck.faceUpCards[_idx], oldPos, 1);
      }

      break;
    }
  }
};

handleSubmit = function handleSubmit(cx, cy) {
  if (cx >= SUBMIT_POS.x && cx <= SUBMIT_POS.x + SUBMIT_SIZE.x && cy >= SUBMIT_POS.y && cy <= SUBMIT_POS.y + SUBMIT_SIZE.y) {
    if (deck.selected.length === 3) {
      if (game.isValidSelection(deck.selected)) {
        deck.selected.forEach(function (card) {
          deck.removeCard(card);
          drawOutOfPlayCard();
        });
        deck.selected = [];
        renderBoard();
      }
    }
  }

  showMoveButton();
};

highlightCard = function highlightCard(pos) {
  ctx.globalAlpha = .5;
  ctx.fillStyle = "yellow";
  ctx.fillRect(pos.x, pos.y, CARD_SIZE.x, CARD_SIZE.y);
  ctx.globalAlpha = 1;
};

highlightSelected = function highlightSelected() {
  deck.selected.forEach(function (card) {
    idx = deck.faceUpCards.indexOf(card);
    var pos = {
      x: IN_SET.x + Math.floor(idx / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
      y: IN_SET.y + idx % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
    };
    highlightCard(pos);
  });
};

ctx.fillStyle = "gray";
ctx.fillRect(SUBMIT_POS.x, SUBMIT_POS.y, SUBMIT_SIZE.x, SUBMIT_SIZE.y);
ctx.fillStyle = "white";
ctx.font = "20px Georgia";
ctx.fillText("Submit", SUBMIT_POS.x, SUBMIT_POS.y + 30);
ctx.fillStyle = "gray";
ctx.fillRect(DEAL_THREE_MORE_POS.x, DEAL_THREE_MORE_POS.y, SUBMIT_SIZE.x, SUBMIT_SIZE.y);
ctx.fillStyle = "white";
ctx.font = "20px Georgia";
ctx.fillText("Deal Three More", DEAL_THREE_MORE_POS.x, DEAL_THREE_MORE_POS.y + 30);

handleDealThreeMore = function handleDealThreeMore(cx, cy) {
  if (cx >= DEAL_THREE_MORE_POS.x && cx <= DEAL_THREE_MORE_POS.x + SUBMIT_SIZE.x && cy >= DEAL_THREE_MORE_POS.y && cy <= DEAL_THREE_MORE_POS.y + SUBMIT_SIZE.y && deck.faceUpCount <= 12) {
    debugger;

    for (var i = 0; i < 15; i++) {
      if (deck.faceUpCards[i].symbol === undefined) {
        var pos = {
          x: IN_SET.x + Math.floor(i / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
          y: IN_SET.y + i % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
        };
        drawCard(pos, 1);
        drawSymbols(deck.dealCard(i), pos, 1);
      }
    }
  }

  showMoveButton();
};

handleShowMove = function handleShowMove(cx, cy) {
  if (cx >= SHOW_VALID_POS.x && cx <= SHOW_VALID_POS.x + SUBMIT_SIZE.x && cy >= SHOW_VALID_POS.y && cy <= SHOW_VALID_POS.y + SUBMIT_SIZE.y) {
    renderBoard();
    var selections = game.findAllValidSelections(deck.faceUpCards);

    if (selections.length > 0) {
      selections[0].forEach(function (card) {
        idx = deck.faceUpCards.indexOf(card);
        var pos = {
          x: IN_SET.x + Math.floor(idx / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
          y: IN_SET.y + idx % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
        };
        highlightCard(pos);
      });
      deck.selected = selections[0];
    }
  }
};

renderBoard = function renderBoard() {
  for (var i = 0; i < 15; i++) {
    var pos = {
      x: IN_SET.x + Math.floor(i / 3) * (CARD_SIZE.x + CARD_MARGIN.x),
      y: IN_SET.y + i % 3 * (CARD_SIZE.y + CARD_MARGIN.y)
    };
    drawCard(pos, 1);
    drawSymbols(deck.faceUpCards[i], pos, 1);
  }
};

handleNewGame = function handleNewGame(cx, cy) {
  if (cx >= NEW_GAME_POS.x && cx <= NEW_GAME_POS.x + SUBMIT_SIZE.x && cy >= NEW_GAME_POS.y && cy <= NEW_GAME_POS.y + SUBMIT_SIZE.y) {
    newGame();
  }
};

newGame = function newGame() {
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

window.onload = function () {
  newGame();
  showMoveButton();
};

showMoveButton = function showMoveButton() {
  ctx.fillStyle = "gray";
  ctx.fillRect(SHOW_VALID_POS.x, SHOW_VALID_POS.y, SUBMIT_SIZE.x, SUBMIT_SIZE.y);
  ctx.fillStyle = "white";
  ctx.font = "20px Georgia";
  ctx.fillText("".concat(game.findAllValidSelections(deck.faceUpCards).length), SHOW_VALID_POS.x, SHOW_VALID_POS.y + 10);
  ctx.fillText("Show Move", SHOW_VALID_POS.x, SHOW_VALID_POS.y + 30);
};

ctx.fillStyle = "gray";
ctx.fillRect(NEW_GAME_POS.x, NEW_GAME_POS.y, SUBMIT_SIZE.x, SUBMIT_SIZE.y);
ctx.fillStyle = "white";
ctx.font = "20px Georgia";
ctx.fillText("New Game", NEW_GAME_POS.x, NEW_GAME_POS.y + 30);

drawOutOfPlayCard = function drawOutOfPlayCard() {
  scale = 1 / 3;
  idx = deck.outOfPlayCards.length - 1;
  var pos = {
    x: OUT_OF_PLAY_POS.x + idx % 3 * (CARD_SIZE.x + CARD_MARGIN.x) * scale,
    y: OUT_OF_PLAY_POS.y + Math.floor(idx / 3) * (CARD_SIZE.y + CARD_MARGIN.y) * scale
  };
  drawCard(pos, scale);
  drawSymbols(deck.outOfPlayCards[idx], pos, scale);
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map