import Sortable from '../../../../lib/sortable.esm.js';

import Event    from '../../../core/src/event.js';
import Id       from '../../../core/src/id.js';
import Input    from '../components/input/input.js';
import Template from '../../../web/src/template.js';

/**
 * Creates a column projection
 *
 * @param {function(import('../../../core/src/event').Event): void} dispatch Function to dispatch an event
 * @param {String} id
 * @param {String} text
 */
const Column = (dispatch, id, text = 'column') => {
  const $column = Template(`
    <div class="column" id="column-${id}">
      <nav>
        <div class="col-toggle">
          <input id="col-toggle-${id}" class="col-toggle__toggle" type="checkbox">
          <label for="col-toggle-${id}">
            &hellip;
          </label>
          <div class="col-toggle__content button-group">
            <button class="full-width card-add">Add Card</button>
            <button class="full-width column-remove">Remove Column</button>
          </div>
        </div>
      </nav>
      <div class="cards" data-id="${id}">
      </div>
    </div>
  `);

  // DOM references
  const $addCard      = $column.querySelectorAll('button')[0];
  const $removeColumn = $column.querySelectorAll('button')[1];
  const $nav          = $column.querySelector('nav');
  const $cards        = $column.querySelector('.cards');
  const $colToggle    = $column.querySelector('nav .col-toggle__toggle');

  // Init sortable
  Sortable.create($cards, {
    group    : 'shared',
    animation: 150,
    draggable: '.draggable',
    onEnd: event => {
      const cardId       = event.item.dataset.id;
      const fromColumnId = event.from.dataset.id;
      const toColumnId   = event.to  .dataset.id;
      const newIndex     = event.newIndex;
      dispatch(Event('CARD_MOVED', { cardId, fromColumnId, toColumnId, position: newIndex }));
    },
  });

  const $input = Input(id, text, dispatch);
  $nav.prepend($input);

  // DOM listeners
  $addCard.addEventListener('click', evt => {
    const cardId = Id();
    dispatch(Event('CARD_CREATED', { columnId: id, cardId }));
    $colToggle.checked = false;
  });

  $removeColumn.addEventListener('click', evt => {
    dispatch(Event('COLUMN_REMOVED', { columnId: id }));
    $colToggle.checked = false;
  });

  window.addEventListener('click', evt => {
    if (evt.target === $colToggle) return;
    if ($colToggle.checked) {
      $colToggle.checked = false;
    }
  });

  return $column;
}

export default Column;

