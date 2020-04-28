import send  from './api.js';
import Event from '../core/src/event.js';
import Id    from '../core/src/id.js';

const eventsPerSecond = 30;
let counter = 0;

const columnIds = [];
const cards     = [];

const addColumn = () => {
  const columnId = Id();
  columnIds.push(columnId);
  send(Event('COLUMN_CREATED', { columnId }));
  counter++;
}

const removeColumn = () => {
  const columnId = columnIds.pop();
  send(Event('COLUMN_REMOVED', { columnId }));
  counter++;
}

const addCard = () => {
  const cardId   = Id();
  const columnId = columnIds[Math.floor(Math.random() * columnIds.length)];
  cards.push({ cardId, columnId });
  send(Event('CARD_CREATED', { cardId, columnId }));
  counter++;
}

const removeCard = () => {
  const { cardId, columnId } = cards.pop();
  send(Event('CARD_REMOVED', { cardId, columnId }));
  counter++;
}

setInterval(() => {
  console.log("# of events: " + counter);

  if(columnIds.length === 0) return addColumn();
  if(columnIds.length  >  4) return removeColumn();
  if(cards    .length === 0) return addCard();
  if(cards    .length  >  4) return removeCard();

  const rand = Math.random();
  if(rand < 0.5) return addCard();
  if(rand < 0.6) return addColumn();
  if(rand < 0.9) return removeCard();

  removeColumn();
}, 1000 / eventsPerSecond);
