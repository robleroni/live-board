import app from '../../client.js';

const RemoveColumnHandler = event => {
  const columnId = event.payload.columnId;
  const $column  = document.getElementById('column-' + columnId);

  if(!$column) {
    return;
  }

  app.dom.remove($column);
}

export default RemoveColumnHandler;