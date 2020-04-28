/**
 * Sets the textContent of an element 
 * 
 * @callback DomSetTextContentOperation
 * @param {HTMLElement} $element
 * @param {String} textContent
 * @returns {import('../dom-projection').DomOperation}
*/
const DomSetTextContentOperation = ($element, textContent) => {

  const previousTextContent = $element.textContent;

  const execute = () => {
    if ($element) {
      $element.textContent = textContent;
      return true;
    }
    return false;
  };

  const reverse = () => DomSetTextContentOperation($element, previousTextContent).execute();

  return { execute, reverse };
};

export default DomSetTextContentOperation;
