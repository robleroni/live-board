import DomAppendOperation         from './operations/dom-append-operation.js';
import DomPrependOperation        from './operations/dom-prepend-operation.js';
import CheckpointOperation        from './operations/checkpoint-operation.js';
import DomRemoveFromOperation     from './operations/dom-remove-from-operation.js';
import DomRemoveOperation         from './operations/dom-remove-operation.js';
import DomSetAttributeOperation   from './operations/dom-set-attribute-operation.js';
import DomInsertBeforeOperation   from './operations/dom-insert-before-operation.js';
import DomSetValueOperation       from './operations/dom-set-value-operation.js';
import DomSetTextContentOperation from './operations/dom-set-text-content-operation.js';

/**
 * @typedef {Object} DomOperation
 * @property {function(): boolean} execute
 * @property {function(): boolean} reverse
 */

/**
 * @typedef {Object} DomElement
 * @property {import('./operations/dom-set-attribute-operation').DomSetAttributeOperation}        setAttribute
 * @property {import('./operations/dom-remove-attribute-operation').DomRemoveAttributeOperation}  removeAttribute
 * @property {import('./operations/dom-set-text-content-operation').DomSetTextContentOperation}   setTextContent
 * @property {import('./operations/dom-set-value-operation').DomSetValueOperation}                setValue
 * @property {(String) => DomElement}                                                             querySelector
 * @property {() => HTMLElement}                                                                  getElement
 */

/**
 * @typedef {Object} DomProjection
 * @property {import('./operations/dom-append-operation').DomAppendOperation}                     append
 * @property {import('./operations/dom-prepend-operation').DomPrependOperation}                   prepend
 * @property {import('./operations/dom-insert-before-operation').DomInsertBeforeOperation}        insertBefore
 * @property {import('./operations/dom-remove-from-operation').DomRemoveFromOperation}            removeFrom
 * @property {import('./operations/dom-remove-operation').DomRemoveOperation}                     remove
 * @property {(String) => DomElement}                                                             getElementById
 * @property {(String) => DomElement}                                                             querySelector
 * @property {(String) => void}                                                                   checkpoint
 * @property {(String?) => void}                                                                  restore
 */

 /**
  * @returns {DomProjection} domProjection
  */
const DomProjection = () => {
  const operations = [];

  /**
   * Apply an operation
   * @param {DomOperation} operation
   */
  const applyOperation = operation => {
    const result = operation.execute();
    operations.push(operation);
    return result;
  };

  /**
   * Creates a checkpoint
   * 
   * @param {string} id 
   */
  const checkpoint = id => applyOperation(CheckpointOperation(id));

  /**
   * Restore the DOM to the given id
   * 
   * @param {string} id 
   */
  const restore = id => {
    if(operations.length <= 0) {
      return;
    }

    const last = operations[operations.length - 1];
    if(last.checkpointId && last.checkpointId === id) {
      return;
    }

    last.reverse();
    operations.pop();

    restore(id);
  }

  /**
   * Returns a HTML element which respects the DOM abstraction
   * 
   * @param {HTMLElement} $element 
   */
  const getElement = $element => {
    if(!$element) {
      return null;
    }
    return {
      setAttribute:   (name, value) => applyOperation(DomSetAttributeOperation  ($element, name, value)),
      setValue:       (value)       => applyOperation(DomSetValueOperation      ($element, value)),
      setTextContent: (textContent) => applyOperation(DomSetTextContentOperation($element, textContent)),
      querySelector:  (query)       => getElement($element.querySelector(query)),
      getElement:     ()            => $element.cloneNode(true),
    }
  };

  return {
    append:        ($container, $element)               => applyOperation(DomAppendOperation      ($container, $element)),
    prepend:       ($container, $element)               => applyOperation(DomPrependOperation     ($container, $element)),
    insertBefore:  ($container, $element, $nextElement) => applyOperation(DomInsertBeforeOperation($container, $element, $nextElement)),
    removeFrom:    ($container, $element)               => applyOperation(DomRemoveFromOperation  ($container, $element)),
    remove:        ($element)                           => applyOperation(DomRemoveOperation      ($element)),
    querySelector: (query)                              => getElement(document.querySelector(query)),
    getElementById:(id)                                 => getElement(document.getElementById(id)),
    checkpoint,
    restore,
  }
};

export default DomProjection;