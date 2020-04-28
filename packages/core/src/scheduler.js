/**
 * Executes asynchronous tasks in strict sequence
 */
const Scheduler = () => {
  const taskQueue = [];
  let   running   = false;

  const addTask = task => {
    taskQueue.unshift(task);
    next();
  };

  const next = async () => {
    if (running || taskQueue.length === 0) return;
    running = true;
    await new Promise(taskQueue.pop());
    running = false;
    next();
  };

  return { addTask };
};

export default Scheduler;