import app from '../../../client.js';

const ChangeInputHandler = event => {
  const inputId = event.payload.inputId;
  const text    = event.payload.text;

  const $inputComponent = app.dom.getElementById('input-' + inputId);

  if(!$inputComponent) {
    return;
  }

  const $input = $inputComponent.querySelector('input');
  const $span  = $inputComponent.querySelector('span');

  $input.setValue      (text.substring(0, 20));
  $span .setTextContent(text.substring(0, 20));
}

export default ChangeInputHandler;