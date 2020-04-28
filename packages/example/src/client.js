import Id           from '../../core/src/id.js';
import user         from '../../core/src/user.js';
import Controller   from '../../web/src/controller.js';
import Api          from '../../web/src/api.js';
import Event        from '../../core/src/event.js';

import AddCardHandler          from './handlers/card/add-card.js';
import RemoveCardHandler       from './handlers/card/remove-card.js';
import StartDragHandler        from './handlers/card/start-drag.js';
import MoveCardHandler         from './handlers/card/move-card.js';
import EndDragHandler          from './handlers/card/end-drag.js';
import CreateColumnHandler     from './handlers/column/create-column.js';
import RemoveColumnHandle      from './handlers/column/remove-column.js';
import CreateUserHandler       from './handlers/user/create-user.js';
import RemoveUserHandler       from './handlers/user/remove-user.js';
import SetErrorHandler         from './handlers/error/set-error.js';
import LogEventHandler         from './handlers/log/log-event.js';
import StartChangeInputHandler from './components/input/handlers/start-change-input.js';
import ChangeInputHandler      from './components/input/handlers/change-input.js';
import EndChangeInputHandler   from './components/input/handlers/end-change-input.js';

const SERVER_URL = 'http://localhost:4321';

// Local login
user.setUserId(Id());

const api = Api(SERVER_URL);
const app = Controller(api);

// Attaching event handlers
app.addEventHandler(AddCardHandler,          'CARD_CREATED');         // card handlers
app.addEventHandler(RemoveCardHandler,       'CARD_REMOVED');
app.addEventHandler(StartDragHandler,        'DRAG_STARTED');
app.addEventHandler(MoveCardHandler,         'CARD_MOVED');
app.addEventHandler(EndDragHandler,          'DRAG_ENDED');
app.addEventHandler(CreateColumnHandler,     'COLUMN_CREATED');       // column handlers
app.addEventHandler(RemoveColumnHandle,      'COLUMN_REMOVED');
app.addEventHandler(CreateUserHandler,       'USER_CREATED');         // user handlers
app.addEventHandler(RemoveUserHandler,       'USER_REMOVED');
app.addEventHandler(StartChangeInputHandler, 'INPUT_CHANGE_STARTED'); // input component handlers
app.addEventHandler(ChangeInputHandler,      'INPUT_CHANGED');
app.addEventHandler(EndChangeInputHandler,   'INPUT_CHANGE_ENDED');
app.addEventHandler(SetErrorHandler,         'SET_ERROR');            // error handler
app.addEventHandler(LogEventHandler);                                 // log handler

// Attaching DOM handler
const $addColumn = document.querySelector('button');
$addColumn.addEventListener('click', _ => {
  app.dispatch(Event('COLUMN_CREATED', { columnId: Id() }));
});

export default app;