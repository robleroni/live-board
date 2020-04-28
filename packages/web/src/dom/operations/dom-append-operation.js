import DomRemoveOperation from './dom-remove-operation.js';

/**
 * Appends an element to a container
 *
 * @callback DomAppendOperation
 * @param {HTMLElement} $container
 * @param {HTMLElement} $element
 * @returns {import('../dom-projection').DomOperation}
*/

const DomAppendOperation = ($container, $element) => {

  const execute = () => {
    if ($container) {
      $container.append($element);
      return true;
    }
    return false;
  };

  const reverse = () => DomRemoveOperation($element).execute();

  return { execute, reverse };
};

export default DomAppendOperation;
