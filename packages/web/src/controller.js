import DomProjection from './dom/dom-projection.js';
import user          from '../../core/src/user.js';
import Store         from '../../core/src/store.js';
import Event         from '../../core/src/event.js';
import Scheduler     from '../../core/src/scheduler.js';

let instance = null;

/**
 * Creates an application controller
 * 
 * @param {object} api 
 */
const Controller = api => {
  const store     = Store();
  const dom       = DomProjection();
  const scheduler = Scheduler();
  const handlers  = {};
  const listeners = [];
  let offline = false;

  /**
   * Adds event handler to an event type
   *
   * @param {function(import('../../core/src/event').Event): void} handler
   * @param {String} type
   */
  const addEventHandler = (handler, type) => {
    if(type) {
      handlers[type] = handlers[type] || [];
      handlers[type].push(handler);
      return;
    }
    // for all events
    listeners.push(handler);
  };

  /**
   * Distributes event within to all local listeners
   *
   * @param {import('../../core/src/event').Event} event
   */
  const run = event => {
    [...(handlers[event.type] || []), ...listeners].forEach(handle => {
      try {
        handle(event)
      } catch (err) {
        event.failed = true;
        console.warn("Could not handle: ", err);
      }
    });
    dom.checkpoint(event.id);
  }

  /**
   * Runs every event which occured after given event (eventId)
   *
   * @param {String} id
   */
  const runAfter = id => {
    const event = store.next(id);
    if(event) {
      run(event);
      runAfter(event.id);
    }
  }

  /**
   * Replays every event after given event (eventId)
   *
   * @param {String} id
   */
  const replayAfter = id => {
    console.warn('Replaying DOM');
    dom.restore(id);
    runAfter(id);
  }

  /**
   * Sends event to the API and retries on fail
   *
   * @param {import('../../core/src/event').Event} event
   */
  const sendRetry = async event => {
    try {
      await api.send(event);
      if (offline) {
        offline = false;
        run(Event('SET_ERROR', { offline: false }));
      }
    } catch(err) {
      if (!offline) {
        offline = true;
        run(Event('SET_ERROR', { offline: 'You are offline!' }));
      }
      await new Promise(res => setTimeout(res, 2000)) // sleep 2000 ms
      return sendRetry(event);
    }
  }

  /**
   * Dispatches event within application and to the API
   *
   * @param {import('../../core/src/event').Event} event
   */
  const dispatch = event => {
    store.append(event);
    run(event);
    scheduler.addTask(resolve => {
      sendRetry(event).then(resolve);
    });
  }

  let errorTimeout;

  api.onEvent(event => {

    // event can be appended at the end
    if (event.lastEventId === store.lastEventId()) {
      store.append(event);
      run(event);
      return;
    }

    // event needs to be inserted in between
    const oldEvent = store.get(event.id);
    if(!oldEvent) {
      event.inConflict = true;
      store.insertAfter(event, event.lastEventId);
      replayAfter(event.lastEventId);
      run(Event('SET_ERROR', { conflict: 'A conflict occured, resolving..' }));
      clearTimeout(errorTimeout);
      errorTimeout = setTimeout(() => run(Event('SET_ERROR', { conflict: false })), 2000);
      return;
    }

    // event already exists but in the wrong position
    if (oldEvent.lastEventId !== event.lastEventId) {
      event.failed = true;
      store.replace(event);
      replayAfter(event.lastEventId);
      return;
    }
  });

  api.listen(user.getUserId());
  sendRetry(Event('USER_CREATED', { userId: user.getUserId() }))

  return { dom, addEventHandler, dispatch };
};

export default url => {
  if (!instance) {
    instance = Controller(url);
  }
  return instance;
}