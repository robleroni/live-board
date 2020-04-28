import DomRemoveOperation from './dom-remove-operation.js';

/**
 * Inserts an element before another
 *
 * @callback DomInsertBeforeOperation
 * @param {HTMLElement} $container
 * @param {HTMLElement} $element
 * @param {HTMLElement} $nextElement
 * @returns {import('../dom-projection').DomOperation}
*/

const DomInsertBeforeOperation = ($container, $element, $nextElement) => {

  const execute = () => {
    if ($container) {
      $container.insertBefore($element, $nextElement || null);
      return true;
    }
    return false;
  };

  const reverse = () => DomRemoveOperation($element).execute();

  return { execute, reverse };
};

export default DomInsertBeforeOperation;
