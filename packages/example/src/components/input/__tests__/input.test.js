import Input from '../input.js';

const curriedTimeout = time => cb => setTimeout(cb, time);
const sleep = time => new Promise(curriedTimeout(time));

describe('input', () => {
  it('should dispatch changed events', async() => {
    // given
    const dispatch         = jest.fn();
    const $inputComponent  = Input('1234', 'my input', dispatch);
    const $input           = $inputComponent.querySelector('input');
    
    const change = (value) => {
      $input.value = value;
      $input.dispatchEvent(new Event('input'));
    }

    // when the value is changed
    change('PAYLOAD #1');
    await sleep(201);

    // then
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: 'INPUT_CHANGED', payload: {text: 'PAYLOAD #1', inputId: '1234' } }));
    dispatch.mockReset()

    // when the value is changed multiple times
    change('PAYLOAD #2');
    await sleep(100);
    change('PAYLOAD #3');
    await sleep(150);

    // then
    expect(dispatch).toBeCalledTimes(0);
    await sleep(101);
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: 'INPUT_CHANGED', payload: {text: 'PAYLOAD #3', inputId: '1234' } }));
    dispatch.mockReset();

    // when the value is invalid
    change('');
    await sleep(201);

    // then
    expect(dispatch).toBeCalledTimes(0);
    expect($input.style.border).toBe('1px solid red');
  });

  it('should dispatch start changes', () => {
    // given
    const dispatch         = jest.fn();
    const $inputComponent  = Input('1234', 'my input', dispatch);
    const $span            = $inputComponent.querySelector('span');

    // when
    $span.dispatchEvent(new Event('click'));

    // then
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: 'INPUT_CHANGE_STARTED', payload: { inputId: '1234' } }));
  });

  it('should dispatch end changes', () => {
    // given
    const dispatch         = jest.fn();
    const $inputComponent  = Input('1234', 'my input', dispatch);
    const $input           = $inputComponent.querySelector('input');
    $input.value           = 'TEST';

    // when
    $input.dispatchEvent(new Event('blur'));

    // then
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: 'INPUT_CHANGE_ENDED', payload: { inputId: '1234' } }));
  });
});