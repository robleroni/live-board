import app  from '../../client.js';
import Card from '../../projections/card.js';

const AddCardHandler = event => {
  const cardId   = event.payload.cardId;
  const columnId = event.payload.columnId;
  const $column  = document.getElementById('column-' + columnId);

  if(!$column) {
    return;
  }

  const $cards = $column.lastElementChild;
  const $card  = Card(app.dispatch, cardId, columnId);

  app.dom.append($cards, $card);
}

export default AddCardHandler;