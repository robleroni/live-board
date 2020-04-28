import DomInsertBeforeOperation from './dom-insert-before-operation.js';

/**
 * Removes an element from the DOM
 *
 * @callback DomRemoveOperation
 * @param {HTMLElement} $element
 * @returns {import('../dom-projection').DomOperation}
*/

const DomRemoveOperation = $element => {
  let $container;
  let $nextChild;

  const execute = () => {
    if ($element) {
      $container = $element.parentElement;
      $nextChild = $element.nextSibling;
      $element.remove();
      return true;
    }
    return false;
  };

  const reverse = () => DomInsertBeforeOperation($container, $element, $nextChild).execute();

  return { execute, reverse };
};

export default DomRemoveOperation;
