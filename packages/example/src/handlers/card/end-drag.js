import app from '../../client.js';

const EndDragHandler = event => {
  const cardId = event.payload.cardId;
  const $card  = app.dom.getElementById('card-' + cardId);

  if(!$card) {
    return;
  }

  const $img = $card.querySelector('img');

  $card.setAttribute('class', 'card draggable');
  $card.setAttribute('draggable', true);
  $card.setAttribute('style', 'opacity: 1');
  $card.setAttribute('data-locked', false);
  $img .setAttribute('style', 'display: none');
}

export default EndDragHandler;