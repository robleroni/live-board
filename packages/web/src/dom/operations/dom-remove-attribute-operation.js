import DomSetAttributeOperation from './dom-set-attribute-operation.js';

/**
 * Removes an attirbute
 *
 * @callback DomRemoveAttributeOperation
 * @param {HTMLElement} $element
 * @param {String} name
 * @param {String} value
 * @returns {import('../dom-projection').DomOperation}
*/

const DomRemoveAttributeOperation = ($element, name, value) => {

  const execute = () => {
    if ($element) {
      $element.removeAttribute(name);
      return true;
    }
    return false;
  };

  const reverse = () => DomSetAttributeOperation($element, name, value).execute();

  return { execute, reverse };
};

export default DomRemoveAttributeOperation;
