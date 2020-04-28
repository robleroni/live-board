import app  from '../../client.js';
import user from '../../../../core/src/user.js';

const StartDragHandler = event => {
  const userId = event.userId;
  const cardId = event.payload.cardId;
  const $card  = app.dom.getElementById('card-' + cardId);

  if(!$card) {
    return;
  }

  const $img = $card.querySelector('img');

  $card.setAttribute('class', 'card');
  $card.setAttribute('draggable', false);
  $card.setAttribute('style', 'opacity: 0.3');
  $card.setAttribute('data-locked', true);
  
  if (user.getUserId() !== userId) {
    $img.setAttribute('src', `https://avatars.dicebear.com/v2/bottts/${encodeURI(userId)}.svg`);
    $img.setAttribute('alt', userId);
    $img.setAttribute('style', 'display: initial');
  }
}

export default StartDragHandler;