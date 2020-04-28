import Event    from '../../../../core/src/event.js';
import Template from '../../../../web/src/template.js';

const Input = (id, text, dispatch) => {
  let timeout;

  const $element = Template(`
    <span id="input-${id}">
      <input maxlength="15" style="display: none; background: none; border: none">
      <span>${text}</span>
    </span>
  `);

  // DOM referecnes
  const $input = $element.firstElementChild;
  const $span  = $element.lastElementChild;

  // DOM listeners
  $input.addEventListener('input', _ => {
    clearTimeout(timeout);
    if($input.value === '') {
      $input.style.border = '1px solid red';
    } else {
      $input.style.border = 'none';
      timeout = setTimeout(() => {
        dispatch(Event('INPUT_CHANGED', { text: $input.value, inputId: id}));
      }, 200);
    }
  });

  $input.addEventListener('blur', _ => {
    if($input.value !== '') {
      $span.textContent = $input.value;

      $input.style.display = 'none';
      $span.style.display  = 'initial';
      dispatch(Event('INPUT_CHANGE_ENDED', { inputId: id }));
    }
  });

  $span.addEventListener('click', _ => {
    $input.value = $span.textContent;

    $span.style.display  = 'none';
    $input.style.display = 'initial';

    $input.focus();

    dispatch(Event('INPUT_CHANGE_STARTED', { inputId: id }));
  });

  return $element;
};

export default Input;