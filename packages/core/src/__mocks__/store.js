export const __mockCallbacks   = new Map();
export const __mockUnsubscribe = new Map();
export const __events = [];

const stream = jest.fn(type => ({
  filter() {
    return this
  },
  subscribe: cb => {
    __mockCallbacks.set(type, cb);
    const unsubscribe = jest.fn();
    __mockUnsubscribe.set(type, unsubscribe);
    return unsubscribe;
  },
}));

export default () => ({
  stream,
  push(event) {
    __events.push(event);
  }
});