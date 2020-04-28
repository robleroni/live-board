import Event from '../../../../core/src/event';
import DomProjection from '../../../../web/src/dom/dom-projection';
import app from '../../client.js';

import CreateColumnHandler from '../column/create-column';
import RemoveColumnHandler from '../column/remove-column';

const mockColumn = (id) => {
  const mockColumn = document.createElement('div');
  mockColumn.id = 'column-' + id;
  return mockColumn;
}

jest.mock('../../projections/column.js', () => {
  return jest.fn().mockImplementation((dispatch, columnId) => mockColumn(columnId))
});
jest.mock('../../client.js', () => ({
  dom: null
}));

beforeEach(() => {
  app.dom = DomProjection();
  document.body.innerHTML = '';
  const $board = document.createElement('div');
  $board.id = 'board';
  document.body.append($board);
})

describe('CreateColumnHandler', () => {
  it('should create a column', () => {
    // when
    CreateColumnHandler(Event('COLUMN_CREATED', { columnId: '123' }));

    // then
    expect(document.getElementById('column-123')).not.toBeNull();
  });
});

describe('CreateColumnHandler', () => {
  it('should remove a column', () => {
    // given
    CreateColumnHandler(Event('COLUMN_CREATED', { columnId: '123' }));

    // when
    RemoveColumnHandler(Event('COLUMN_REMOVED', { columnId: '123' }))

    // then
    expect(document.getElementById('column-123')).toBeNull();
  });
});