/**
 * Sets the value of an element 
 * 
 * @callback DomSetValueOperation
 * @param {HTMLElement} $element
 * @param {String} value
 * @returns {import('../dom-projection').DomOperation}
*/
const DomSetValueOperation = ($element, value) => {

  const previousValue = $element.value;

  const execute = () => {
    if ($element) {
      $element.value = value;
      return true;
    }
    return false;
  };

  const reverse = () => DomSetValueOperation($element, previousValue).execute();

  return { execute, reverse };
};

export default DomSetValueOperation;
