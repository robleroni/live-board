import app from '../../client.js';

const MoveCardHandler = event => {
  const cardId       = event.payload.cardId;
  const fromColumnId = event.payload.fromColumnId;
  const toColumnId   = event.payload.toColumnId;
  const position     = event.payload.position;
  const $card        = document.getElementById('card-'   + cardId);
  const $fromColumn  = document.getElementById('column-' + fromColumnId);
  const $toColumn    = document.getElementById('column-' + toColumnId);

  if(!$fromColumn || !$toColumn || !$card) {
    return;
  }

  app.dom.removeFrom($fromColumn.lastElementChild, $card);

  const $cards    = $toColumn.lastElementChild;
  const $nextCard = $cards.children[position];
  
  app.dom.insertBefore($cards, $card, $nextCard);
}

export default MoveCardHandler;
