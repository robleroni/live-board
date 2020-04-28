import app from '../../client.js';

const RemoveCardHandler = event => {
  const cardId = event.payload.cardId;
  const $card  = document.getElementById('card-' + cardId);

  if(!$card) {
    return;
  }

  app.dom.remove($card);
}

export default RemoveCardHandler;