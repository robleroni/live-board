/**
 * Sets a checkpoint in the history
 * 
 * @callback DomAppendOperation
 * @param {String} id
 * @returns {import('../dom-projection').DomOperation}
*/

const CheckpointOperation = id => {

  const checkpointId = id;

  const execute = () => {};
  const reverse = () => {};

  return { checkpointId, execute, reverse };
};

export default CheckpointOperation;
