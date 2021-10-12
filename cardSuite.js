function defineSuit(card) {
    figure = card.charAt(card.length-1)
    switch(figure){
        case '♣':
          figureTxt = 'clubs'
          break
        case '♦':
          figureTxt = 'diamonds'
          break
        case '♥':
          figureTxt = 'hearts'
          break
        case '♠':
          figureTxt = 'spades'
    }
    return figureTxt
  }