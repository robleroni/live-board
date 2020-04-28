/**
 * Creates HTMLElement from HTML template string
 *
 * @param {String} html
 * @returns {HTMLElement}
 */
const Template = html => {
  const $template = document.createElement('div');
  $template.innerHTML = html;
  return $template.firstElementChild;
}

export default Template;