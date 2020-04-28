/**
 * Creates an API
 * 
 * @param {string} url 
 */
const Api = url => {
  const listeners = [];

  /**
   * Adds event listener, which is notified on events from the API
   *
   * @param {function(import('../../core/src/event').Event): void} callback
   */
  const onEvent = callback => listeners.push(callback);

  /**
   * Listen to the API's event source
   *
   * @param {String} userId
   */
  const listen = userId => {
    const source = new EventSource(url + '?userId=' + userId);
    source.addEventListener("message", message => {
      const event = JSON.parse(message.data);
      listeners.forEach(notify => notify(event));
    });
  };

  /**
   * Sends event to API
   *
   * @param {import('../../core/src/event').Event} event
   */
  const send = async (event) => {
    return fetch(url, { method: 'POST', body: JSON.stringify(event) });
  };

  return { send, listen, onEvent };
};

export default Api;