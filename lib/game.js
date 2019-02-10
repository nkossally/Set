const Deck = require("./deck.js");

class Game {
  constructor(){
    selected=[];
  }

  isValidSelection(){
    this.validColors() && this.validNumbers() && this.validShading()
      && this.validSymbols();
  }

  validColors(){
    testOne = this.selected[0].color === this.selected[1].color
      && this.selected[0].color === this.selected[2].color
    testTwo = this.selected[0].color != this.selected[1].color
      && this.selected[0].color != this.selected[2].color
      && this.selected[1].color != this.selected[2].color
    return testOne || testTwo;
  }

  validShading(){
    testOne = this.selected[0].shading === this.selected[1].shading
      && this.selected[0].shading === this.selected[2].shading
    testTwo = this.selected[0].shading != this.selected[1].shading
      && this.selected[0].shading != this.selected[2].shading
      && this.selected[1].shading != this.selected[2].shading
    return testOne || testTwo;
  }

  validNumbers(){
    testOne = this.selected[0].number === this.selected[1].number
      && this.selected[0].number === this.selected[2].number
    testTwo = this.selected[0].number != this.selected[1].number
      && this.selected[0].number != this.selected[2].number
      && this.selected[1].number != this.selected[2].number
    return testOne || testTwo;
  }

  validSymbols(){
    testOne = this.selected[0].symbols === this.selected[1].symbols
      && this.selected[0].symbols === this.selected[2].symbols
    testTwo = this.selected[0].symbols != this.selected[1].symbols
      && this.selected[0].symbols != this.selected[2].symbols
      && this.selected[1].symbols != this.selected[2].symbols
    return testOne || testTwo;
  }

  handleSubmit(){
    if(this.isValidSection()){

    }
  }

}

module.exports = Game;