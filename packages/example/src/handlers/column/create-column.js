import app    from '../../client.js';
import Column from '../../projections/column.js';

const CreateColumnHandler = event => {
  const columnId = event.payload.columnId;
  const $board   = document.getElementById('board');

  const $column = Column(app.dispatch, columnId);
  app.dom.append($board, $column);
}

export default CreateColumnHandler;