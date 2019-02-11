const COLORS = ['#fb4c4d', '#0ef691', '#62a6e0'];
const SYMBOL = ['oval', 'rectangle', 'diamond'];
const NUMBER = [1, 2, 3];
const SHADING = ['solid', 'open', 'striped'];

class Deck {
  constructor(){
    this.pile = [];
    this.faceUpCards = [];
    this.selected = [];
    this.outOfPlayCards = [];
    this.deal_card = this.deal_card.bind(this);
    this.create_deck = this.create_deck.bind(this);
  }

  card(color, symbol, number, shading){
    return {color: color, symbol: symbol, number: number, shading: shading};
  }

  create_deck(){
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

  deal_card(){
    idx = Math.floor(Math.random()*(this.pile.length-1));
    this.faceUpCards.push(this.pile[idx]);
    this.pile.splice(idx, 1);
    return this.faceUpCards[this.faceUpCards.length-1];
  }

}

module.exports = Deck;