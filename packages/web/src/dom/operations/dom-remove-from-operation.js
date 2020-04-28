import DomInsertBeforeOperation from './dom-insert-before-operation.js';

/**
 * Removes an element from a container
 *
 * @callback DomRemoveFromOperation
 * @param {HTMLElement} $container
 * @param {HTMLElement} $element
 * @returns {import('../dom-projection').DomOperation}
*/

const DomRemoveFromOperation = ($container, $element) => {
  let $nextChild;

  const execute = () => {
    if ($element) {
      $nextChild = $element.nextSibling;
      $element.remove();
      return true;
    }
    return false;
  };

  const reverse = () => DomInsertBeforeOperation($container, $element, $nextChild).execute();

  return { execute, reverse };
};

export default DomRemoveFromOperation;
