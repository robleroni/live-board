import Event from '../../../../core/src/event';
import DomProjection from '../../../../web/src/dom/dom-projection';
import app from '../../client.js';

import SetError from '../../handlers/error/set-error';

jest.mock('../../client.js', () => ({
  dom: null
}));

describe('SetErrorHandler', () => {
  let $error;
  beforeEach(() => {
    app.dom = DomProjection();
    document.body.innerHTML = '';
    $error = document.createElement('div');
    $error.id = 'error';
    document.body.append($error);
  });


  it('should do nothing on empty payload', () => {
    // given
    const event = Event('SET_ERROR', undefined);

    // when
    SetError(event);

    // then
    expect($error.textContent).toBe('');
  });

  it('should add and remove errors', () => {
    // when
    const payload = { offline: 'You are offline' };
    SetError(Event('SET_ERROR', payload));

    // then
    expect($error.textContent).toBe('You are offline');
    expect(JSON.parse($error.dataset.errors)).toEqual(payload);

    // when
    SetError(Event('SET_ERROR', { offline: false }));

    // then
    expect($error.textContent).toBe('');
    expect(JSON.parse($error.dataset.errors)).toEqual({ offline: false });
  });
});