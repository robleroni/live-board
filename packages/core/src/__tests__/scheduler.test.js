import Scheduler from '../scheduler.js';

describe('Scheduler', () => {
  let scheduler;

  beforeEach(() => {
    scheduler = Scheduler();
  })

  it('should execute a task', async () => {
    // given
    const arr = [];

    // when
    await new Promise(resolve => scheduler.addTask(res => {
      arr.push(1);
      res();
      resolve();
    }));

    // then
    expect(arr).toHaveLength(1);
    expect(arr[0]).toBe(1);
  });

  it('should execute tasks in order', async () => {
    // given
    const arr = [];

    // when
    scheduler.addTask(res => {
      arr.push('first');
      res();
    });

    await new Promise(resolve => scheduler.addTask(res => {
      arr.push('second');
      res();
      resolve();
    }));

    // then
    expect(arr).toHaveLength(2);
    expect(arr[0]).toBe('first');
    expect(arr[1]).toBe('second');
  })
});