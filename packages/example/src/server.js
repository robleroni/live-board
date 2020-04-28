
import * as fs           from 'fs';
import { join, resolve } from 'path';

import Store       from '../../core/src/store.js';
import EventServer from '../../server/src/event-server.js';

const PORT      = process.env.port || 4321;
const DB_FILE   = join(resolve(''), 'data/events.db');
const SEPARATOR = '\n';

let events = [];

// reading events from DB file
try {
  events = fs.readFileSync(DB_FILE)
    .toString()
    .split (SEPARATOR)
    .filter(event => !!event)
    .map   (event => JSON.parse(event));
} catch (err) {
  console.log('/**** DB file not found or corrupt ****/');
}

// creating persistent store
const store       = Store(events);
const lastEventId = store.lastEventId();
let   stream      = store.stream();
if(lastEventId) {
  stream = stream.skipUntilAfter(event => event.id === lastEventId)
}
stream.subscribe(event => fs.appendFileSync(DB_FILE, JSON.stringify(event) + SEPARATOR));

// running server
const server = EventServer(store);
server.listen(PORT);
  
console.log(`/**** SERVER IS LISTENING ON PORT ${PORT} ****/`);