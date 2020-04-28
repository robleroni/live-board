import user from './user.js';
import Id   from './id.js';

/**
 * @typedef {Object} Event
 * @property {String} id       unique id for each event
 * @property {String} type     type/topic of an event 
 * @property {String} userId   issuer of the event
 * @property {Object} payload  contained data
 */

/**
 * Creates a new Event
 * 
 * @param {String} type 
 * @param {Object} payload 
 * 
 * @returns {Event}
 */
const Event = (type, payload = {}) => ({
  type,
  id: Id(),
  userId: user.getUserId(),
  payload
});

export default Event;