import Scheduler from './scheduler.js';

/**
 * Create a Store
 * 
 * @param  {...import('./event').Event} events 
 */
const Store = (...events) => {
  const scheduler   = Scheduler();
  const log         = [];
  let   subscribers = [];

  /**
   * Checks if a given event exists
   *
   * @param {String} eventId
   * @returns {Boolean}
   */
  const exists = eventId => log.some(event => event.id === eventId);

  /**
   * Gets the last eventId in the store
   *
   * @returns {String} eventId
   */
  const lastEventId = () => log.length ? log[log.length - 1].id : undefined;


  // Insert given events
  events.flat().forEach(event => {
    if(exists(event.id)) {
      return;
    }
    event.lastEventId = lastEventId();
    log.push(event);
  });

  /**
   * Get an event by Id
   *
   * @param {String} eventId
   * @returns {import('./event').Event} event
   */
  const get = eventId => log.find(event => event.id === eventId);

  /**
   * Returns an event after a given eventId
   *
   * @param {String} eventId
   * @returns {import('./event').Event}
   */
  const next = eventId => {
    const index = log.findIndex(event => event.id === eventId);
    return log[index + 1]
  }

  /**
   * Notifies all listeners about a given event
   * Get an event by Id
   *
   * @param {import('./event').Event} event
   * @param {String} eventId
   * @returns {import('./event').Event} event
   */
  const notify = event => subscribers.forEach(subscriber => subscriber(event));

  /**
   * Appends a new event to the store
   *
   * @param {import('./event').Event} event
   */
  const append = event => {
    scheduler.addTask(resolve => {
      if(!exists(event.id)) {
        event.lastEventId = lastEventId();
        log.push(event);
        notify(event);
      } else{
        console.warn('Did not insert already existing event');
      }
      resolve();
    });
  };

  /**
   * Adds a new event after a given eventId
   *
   * @param {import('./event').Event} event
   * @param {String} afterId
   */
  const insertAfter = (event, afterId) => {
    scheduler.addTask(resolve => {
      if(!exists(event.id)) {
        const index = log.findIndex(e => e.id === afterId);

        // correct next event
        const nextEvent = log[index + 1];
        if (nextEvent) {
          nextEvent.lastEventId = event.id;
        }

        log.splice(index + 1, 0, event);
      }
      resolve();
    });
  }

  /**
   * Replaces a given event in the store
   *
   * @param {import('./event').Event} event
   */
  const replace = event => {
    scheduler.addTask(resolve => {
      const index = log.findIndex(e => e.id === event.id);

      if(index === -1) {
        resolve();
        return;
      }

      // correct next event
      const nextEvent = log[index + 1];
      const prevEvent = log[index - 1];

      if(nextEvent) {
        nextEvent.lastEventId = prevEvent ? prevEvent.id : undefined;
      }

      // remove
      log.splice(index, 1);

      // add
      insertAfter(event, event.lastEventId);
      resolve();
    });
  }

  /**
   * @typedef {Object} Stream
   * @property {function(function): Stream} map
   * @property {function(function): Stream} filter
   * @property {function(function): Stream} skipUntilAfter
   * @property {function(function): function} subscribe
   */

  /**
   * Returns a subscribable stream
   *
   * @param type
   * @returns {Stream}
   */
  const stream = type => {
    const stream = {
      operations: [],
      skip: false,
      map(fn) {
        this.operations.push(evt => evt && fn(evt));
        return this;
      },
      filter(fn) {
        this.operations.push((evt) => fn(evt) ? evt : undefined);
        return this;
      },
      skipUntilAfter(fn) {
        this.operations.push((evt) => {
          if(this.skip) return evt;
          if(fn(evt)) this.skip = true;
        });
        return this;
      },
      subscribe(callback) {
        const subscription = evt => {
          const event = this.operations.reduce((last, next) => last && next(last), evt);
          if (event) {
            callback(event);
          }
        };
        scheduler.addTask(resolve => {
          log.forEach(subscription);
          subscribers.push(subscription);
          resolve();
        });
        return () => subscribers = subscribers.filter(s => s !== subscription); // unsubscribe
      }
    };

    if (type) {
      return stream.filter(evt => evt.type === type);
    }

    return stream;
  }

  return { get, next, append, insertAfter, replace, stream, lastEventId, log };

}

export default Store;