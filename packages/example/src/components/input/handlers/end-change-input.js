import app  from '../../../client.js';
import user from '../../../../../core/src/user.js';

const EndChangeInputHandler = event => {
  const userId  = event.userId;
  const inputId = event.payload.inputId;
  
  const $inputComponent = app.dom.getElementById('input-' + inputId);

  if(!$inputComponent) {
    return;
  }

  if(userId === user.getUserId()) {
    return;
  }

  const $input = $inputComponent.querySelector('input');
  const $span  = $inputComponent.querySelector('span');

  let editors = JSON.parse($input.getElement().dataset.editors || '[]');
  editors     = editors.filter(editor => editor !== userId);
  $inputComponent.setAttribute('data-editors', JSON.stringify(editors));
  
  $inputComponent.setAttribute('style', `
    background  : ${editors.length ? `url(https://avatars.dicebear.com/v2/bottts/${encodeURI(editors[editors.length-1])}.svg) no-repeat` : 'none'};
    padding-left: ${editors.length ? '20px' : 'none'}
  `);

  if(!editors.length) {
    $input.setAttribute('style', $input.getElement().getAttribute('style') + '; border: none');
    $span .setAttribute('style', $span .getElement().getAttribute('style') + '; border: none');
  }

}

export default EndChangeInputHandler;