import DomRemoveOperation from './dom-remove-operation.js';

/**
 * Prepends an element to a container
 *
 * @callback DomPrependOperation
 * @param {HTMLElement} $container
 * @param {HTMLElement} $element
 * @returns {import('../dom-projection').DomOperation}
*/

const DomPrependOperation = ($container, $element) => {

  const execute = () => {
    if ($container) {
      $container.prepend($element);
      return true;
    }
    return false;
  };

  const reverse = () => DomRemoveOperation($element).execute();

  return { execute, reverse };
};

export default DomPrependOperation;
