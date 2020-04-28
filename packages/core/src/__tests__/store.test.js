import Event from '../event.js';
import Store from '../store.js';

const curriedTimeout = time => cb => setTimeout(cb, time);
const sleep = time => new Promise(curriedTimeout(time));

describe('store', () => {

  let store;

  beforeEach(() => {
    store = Store();
  });

  it('should be able to subscribe to stream', done => {
    // given
    const msg = 'test msg';

    store.stream('MY_EVENT').subscribe(e => {
      // then
      expect(e.payload).toBe(msg);
      done();
    });

    // when
    store.append(Event('MY_EVENT', msg));
  });

  it('should be able to map event payload', done => {
    // given
    const msg1 = 'test msg';
    const msg2 = 'new msg';

    store.stream('MY_EVENT2')
      .map(e => ({ ...e, payload: msg2 }))
      .subscribe(e => {
        // then
        expect(e.payload).toBe(msg2);
        done();
      });

    // when
    store.append(Event('MY_EVENT2', msg1));
  });

  it('should be able to filter events', done => {
    // given
    const msg1 = 'test msg';
    const msg2 = 'new msg';

    store.stream('MY_EVENT3')
      .filter(e => e.payload !== msg1)
      .subscribe(e => {
        // then
        expect(e.payload).toBe(msg2);
        done();
      });

    // when
    store.append(Event('MY_EVENT3', msg1));
    store.append(Event('MY_EVENT3', msg2));
  });

  it('should be able to skip a stream until after a condition is met', done => {
    // given
    const event1 = Event('MY_EVENT', 'test1');
    const event2 = Event('MY_EVENT', 'test2');

    store.stream('MY_EVENT')
      .skipUntilAfter(e => e.id === event1.id)
      .subscribe(e => {
        // then
        expect(e.payload).toBe('test2');
        done();
      });

    // when
    store.append(event1);
    store.append(event2);
  });

  it('should be able to replace event', async () => {
    // given
    const event = Event('REPLACE_EVENT', 'test msg');
    store.append(event);

    // when
    // copy event to prevent false positive by editing the object instance
    const evt = JSON.parse(JSON.stringify(event));
    evt.payload = 'new msg';
    store.replace(evt);
    // Wait in a more deterministic fashion...
    await sleep(100);

    // then
    expect(store.log.find(e => e.id === evt.id)).toMatchObject(evt);
  })
})