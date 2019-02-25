const COLORS = ['#fb4c4d', '#0ef691', '#62a6e0'];
const SYMBOL = ['oval', 'rectangle', 'diamond'];
const NUMBER = [1, 2, 3];
const SHADING = ['solid', 'open', 'striped'];

class Deck {
  constructor(){
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

  card(color, symbol, number, shading){
    return {color: color, symbol: symbol, number: number, shading: shading};
  }

  createDeck(){
    for (let i = 0; i < COLORS.length; i++) {
      for (let j = 0; j < SYMBOL.length; j++) {
        for (let k = 0; k < NUMBER.length; k++) {
          for (let l = 0; l < SHADING.length; l++) {
            this.pile.push(this.card(COLORS[i], SYMBOL[j], NUMBER[k], SHADING[l]));
          }          
        } 
      } 
    }
  }  

  dealCard(idx){
    // if(this.faceUpCards[idx] && this.faceUpCards[idx].symbol !== undefined){
    //     return this.faceUpCards[idx];
    // }
    if(this.pile.length > 0){
      idxPile = Math.floor(Math.random()*(this.pile.length-1));
      this.faceUpCards[idx]=(this.pile[idxPile]);
      this.faceUpCount += 1;
      this.pile.splice(idxPile, 1);
      return this.faceUpCards[idx];
    } else {
      return this.dealNullCard(idx);
    }
  }

  dealNullCard(idx){
    let nullCard =  this.card(undefined, undefined, undefined, undefined);
    this.faceUpCards[idx] = nullCard;
    return nullCard;
  }

  removeCard(card){
    this.outOfPlayCards.push(card);
    // this.selected.splice(this.selected.indexOf(card), 1);
    idx = this.faceUpCards.indexOf(card);
    this.faceUpCount -= 1;
    
    if(this.faceUpCount < 12) {
      
      this.dealCard(idx);
    } else {
      this.dealNullCard(idx);
    }
    return idx;
  }
}

module.exports = Deck;