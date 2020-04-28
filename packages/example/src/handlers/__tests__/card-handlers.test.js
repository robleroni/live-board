import AddCardHandler from '../card/add-card.js';
import RemoveCardHandler from '../card/remove-card.js';
import StartDragHandler from '../card/start-drag.js';
import EndDragHandler from '../card/end-drag.js';
import MoveCardHandler from '../card/move-card.js';

import Event from '../../../../core/src/event.js';
import app from '../../client.js';
import DomProjection from '../../../../web/src/dom/dom-projection.js';

const mockCard = (id) => {
  const mockCard = document.createElement('div');
  const mockImg = document.createElement('img');
  mockCard.append(mockImg);
  mockCard.id = 'card-' + id;
  return mockCard;
}

const mockColumn = (id) => {
  const mockColumn = document.createElement('div');
  mockColumn.id = 'column-' + id;
  const mockCards = document.createElement('div');
  mockCards.className = 'cards';
  mockColumn.append(mockCards);
  return mockColumn;
}

jest.mock('../../projections/card.js', () => {
  return jest.fn().mockImplementation((dispatch, cardId, columnId) => mockCard(cardId))
});
jest.mock('../../client.js', () => ({
  dom: null
}));


beforeEach(() => {
  app.dom = DomProjection();
  document.body.innerHTML = '';
  document.body.appendChild(mockColumn('321'));
})

describe('AddCardHandler', () => {
  it('should create a card', () => {
    // when
    AddCardHandler(Event('CARD_CREATED', { cardId: '123', columnId: '321' }));

    // then
    expect(document.getElementById('card-123')).not.toBeNull();
  });
});

describe('RemoveCardHandler', () => {
  it('should remove a card', () => {
    // given
    AddCardHandler(Event('CARD_CREATED', { cardId: '123', columnId: '321' }));

    // when
    RemoveCardHandler(Event('CARD_REMOVED', { cardId: '123', columnId: '321' }));

    // then
    expect(document.getElementById('card-123')).toBeNull();
  });
});

describe('StartDragHandler', () => {
  it('should start a drag', () => {
    // given
    AddCardHandler(Event('CARD_CREATED', { cardId: '123', columnId: '321' }));

    // when
    StartDragHandler(Event('DRAG_STARTED', { cardId: '123' }));

    // then
    const $card = document.getElementById('card-123');
    expect($card.getAttribute('draggable')).toBe('false');
    expect($card.style.opacity).toBe('0.3');
  });
});

describe('EndDragHandler', () => {
  it('should end a drag', () => {
    // given
    AddCardHandler(Event('CARD_CREATED', { cardId: '123', columnId: '321' }));
    StartDragHandler(Event('DRAG_STARTED', { cardId: '123' }));

    // when
    EndDragHandler(Event('DRAG_ENDED', { cardId: '123' }));

    // then
    const $card = document.getElementById('card-123');
    expect($card.getAttribute('draggable')).toBe('true')
    expect($card.style.opacity).toBe('1');
  });
});

describe('MoveCardHandler', () => {
  let $cards;
  beforeEach(() => {
    AddCardHandler(Event('CARD_CREATED', { cardId: '123', columnId: '321' }));
    AddCardHandler(Event('CARD_CREATED', { cardId: '124', columnId: '321' }));
    AddCardHandler(Event('CARD_CREATED', { cardId: '125', columnId: '321' }));
    $cards = document.querySelector('#column-321 .cards');
  })

  it('should move a card', () => {
    // given
    expect($cards.children[0].id).toBe('card-123');

    // when
    MoveCardHandler(Event('CARD_MOVED', { cardId: '123', fromColumnId: '321', toColumnId: '321', position: 1 }));

    // then
    expect($cards.children[1].id).toBe('card-123');
  });

  it('should move a card to the top', () => {
    // given
    expect($cards.children[1].id).toBe('card-124');

    // when
    MoveCardHandler(Event('CARD_MOVED', { cardId: '124', fromColumnId: '321', toColumnId: '321', position: 0 }));

    // then
    expect($cards.children[0].id).toBe('card-124');
  });

  it('should move a card to the bottom', () => {
    // given
    expect($cards.children[0].id).toBe('card-123');

    // when
    MoveCardHandler(Event('CARD_MOVED', { cardId: '123', fromColumnId: '321', toColumnId: '321', position: 2 }));

    // then
    expect($cards.children[2].id).toBe('card-123');
  });

  it('should move a card to another column', () => {
    // given
    expect($cards.children[0].id).toBe('card-123');
    document.body.appendChild(mockColumn('322'));

    // when
    MoveCardHandler(Event('CARD_MOVED', { cardId: '123', fromColumnId: '321', toColumnId: '322', position: 0 }));

    // then
    expect($cards.querySelector('#card-123')).toBeNull();
    expect(document.querySelector('#column-322 .cards').children[0].id).toBe('card-123');
  });
});