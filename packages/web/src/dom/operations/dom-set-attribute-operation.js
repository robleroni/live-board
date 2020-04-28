import DomRemoveAttributeOperation from './dom-remove-attribute-operation.js';

/**
 * Adds an attirbute to an element
 *
 * @callback DomSetAttributeOperation
 * @param {HTMLElement} $element
 * @param {String} name
 * @param {String} value
 * @returns {import('../dom-projection').DomOperation}
*/

const DomSetAttributeOperation = ($element, name, value) => {

  const execute = () => {
    if ($element) {
      $element.setAttribute(name, value);
      return true;
    }
    return false;
  };

  const reverse = () => DomRemoveAttributeOperation($element, name, value).execute();

  return { execute, reverse };
};

export default DomSetAttributeOperation;
