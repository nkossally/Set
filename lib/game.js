class Game {
  constructor(){
  }

  isValidSelection(selection){
    return(selection.length === 3 && this.validColors(selection) && this.validNumbers(selection) 
      && this.validShading(selection) && this.validSymbols(selection))
  }

  validColors(selection){
    testOne = selection[0].color === selection[1].color
      && selection[0].color === selection[2].color
    testTwo = selection[0].color !== selection[1].color
      && selection[0].color !== selection[2].color
      && selection[1].color !== selection[2].color
    testThree = selection[0].color !== undefined && selection[1].color !== undefined
      && selection[2].color !== undefined;
    return (testOne || testTwo) && testThree;
  }

  validShading(selection){
    testOne = selection[0].shading === selection[1].shading
      && selection[0].shading === selection[2].shading
    testTwo = selection[0].shading !== selection[1].shading
      && selection[0].shading !== selection[2].shading
      && selection[1].shading !== selection[2].shading
    return testOne || testTwo;
  }

  validNumbers(selection){
    testOne = selection[0].number === selection[1].number
      && selection[0].number === selection[2].number
    testTwo = selection[0].number !== selection[1].number
      && selection[0].number !== selection[2].number
      && selection[1].number !== selection[2].number
    return testOne || testTwo;
  }

  validSymbols(selection){
    testOne = selection[0].symbol === selection[1].symbol
      && selection[0].symbol === selection[2].symbol
    testTwo = selection[0].symbol !== selection[1].symbol
      && selection[0].symbol !== selection[2].symbol
      && selection[1].symbol !== selection[2].symbol
    return testOne || testTwo;
  }

  findAllValidSelections(faceUpCards){
    validSelections = [];
    for (let i = 0; i < faceUpCards.length-2; i++) {
      for (let j = i+1; j < faceUpCards.length-1; j++) {
        for (let k = j+1; k < faceUpCards.length; k++) {
          if(i !== j && i !== k && j !== k ){
              let selection = [faceUpCards[i], faceUpCards[j], faceUpCards[k]];
              if(this.isValidSelection(selection)){
                validSelections.push(selection);
              }
          } 
        }  
      }
    }
    return validSelections;
  }

}

module.exports = Game;