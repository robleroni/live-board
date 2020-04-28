import Event    from '../../../core/src/event.js';
import Input    from '../components/input/input.js';
import Template from '../../../web/src/template.js';

/**
 * Creates a card projection
 *
 * @param {function(import('../../../core/src/event').Event): void} dispatch Function to dispatch an event
 * @param {String} id
 * @param {String} columnId
 * @param {String} text
 * @returns {HTMLElement}
 */
const Card = (dispatch, id, columnId, text = 'change me') => {
  const $card = Template(`
    <div class="card draggable" id="card-${id}" data-id='${id}'>
      <button>-</button>
      <img width="30px" style="display: none;">
    </div>
  `)

  const locked = () => $card.dataset.locked === 'true';

  // DOM referecnes
  const $removeCard = $card.querySelector('button');

  const $input = Input(id, text, dispatch);
  $card.prepend($input);

  // DOM listeners
  $card.addEventListener('dragstart', evt => {
    if (locked()) return;
    dispatch(Event('DRAG_STARTED', { cardId: id }));
  });

  $card.addEventListener('dragend', _ => {
    dispatch(Event('DRAG_ENDED', { cardId: id }));
  });

  $removeCard.addEventListener('click', _ => {
    if (locked()) return;
    dispatch(Event('CARD_REMOVED', { cardId: id, columnId }));
  });

  return $card;
}

export default Card;
