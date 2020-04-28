import http from 'http';
import url  from 'url';

import Event from '../../core/src/event.js';
import Store from '../../core/src/store.js';

const DEFAULT_PORT = 1234;

/**
 * Creats an event server
 * 
 * @param {object} store 
 */
const EventServer = (store = Store()) => {
  const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // cors

    // SSE (pushing events)
    if(req.method === 'GET') {
      res.setHeader('Content-Type', 'text/event-stream');

      const userId      = url.parse(req.url, true).query.userId;
      const lastEventId = req.headers['last-event-id'];

      const onEvent = event => {
        res.write('id:'   + event.id              + '\n');
        res.write('data:' + JSON.stringify(event) + '\n\n');
      };

      let stream = store.stream();
      if(lastEventId) {
        stream = stream.skipUntilAfter(event => event.id === lastEventId)
      }
      stream.subscribe(onEvent);

      // Keep the SSE connection alive
      setInterval(() => {
        res.write(':\n\n');
      }, 5000)

      req.on('close', () => store.append(Event('USER_REMOVED', { userId })));
      return;
    }

    // POST endpoint (receiving events)
    if(req.method === 'POST') {
      req.on('data', async data => {
        const event = JSON.parse(data.toString());
        store.append(event);
        res.end();
      });
    }
  });

  return {
    listen: port => server.listen(port || DEFAULT_PORT)
  };
}

export default EventServer;