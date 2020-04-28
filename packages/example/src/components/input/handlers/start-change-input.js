import app  from '../../../client.js';
import user from '../../../../../core/src/user.js';

const StartChangeInputHandler = event => {
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

  const editors = JSON.parse($input.getElement().dataset.editors || '[]');
  editors.push(userId);
  $inputComponent.setAttribute('data-editors', JSON.stringify(editors));
  
  $inputComponent.setAttribute('style', `
    background: url(https://avatars.dicebear.com/v2/bottts/${encodeURI(userId)}.svg) no-repeat;
    padding-left: 20px
  `);

  $input.setAttribute('style', $input.getElement().getAttribute('style') + '; border: 1px dotted red');
  $span .setAttribute('style', $span .getElement().getAttribute('style') + '; border: 1px dotted red');
}

export default StartChangeInputHandler;