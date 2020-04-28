import user from '../../../../../core/src/user';
import Event from '../../../../../core/src/event';
import DomProjection from '../../../../../web/src/dom/dom-projection';

import app from '../../../client.js';
import StartChangeInputHandler from '../handlers/start-change-input';
import EndChangeInputHandler from '../handlers/end-change-input';

jest.mock('../../../../../core/src/user.js');
jest.mock('../../../client.js', () => ({
  dom: null
}));

let $input;
const userId = '1234';
const otherUserId = '4321';

beforeEach(() => {
  app.dom = DomProjection();
  const inputTemplate =  `
    <span id='input-1'>
      <input />
      <span></span>
    </span>
  `;
  document.body.innerHTML = inputTemplate;
  $input = document.getElementById('input-1');
});


describe('start change input handler', () => {
  it('should not render editors if the current user is editing', () => {
    // given
    user.getUserId = () => userId;
    
    // when
    StartChangeInputHandler(Event('INPUT_START_CHANGE', { inputId: '1' }));

    // then
    expect($input.dataset.editors).toBeUndefined();
  });

  it('should render editors', () => {
    // given
    // first return simulates another user for the event
    user.getUserId = jest.fn().mockReturnValueOnce(otherUserId).mockReturnValue(userId);
    
    // when
    StartChangeInputHandler(Event('INPUT_START_CHANGE', { inputId: '1' }));

    // then
    expect(JSON.parse($input.dataset.editors)).toEqual([ otherUserId ]);
  });
});


describe('end change input handler', () => {
  it('should not remove editors if the current user is editing', () => {
    // given
    user.getUserId = jest.fn().mockReturnValueOnce(otherUserId).mockReturnValue(userId);
    StartChangeInputHandler(Event('INPUT_START_CHANGE', { inputId: '1' }));
    
    // when
    EndChangeInputHandler(Event('INPUT_END_CHANGE', { inputId: '1' }));

    // then
    expect(JSON.parse($input.dataset.editors)).toEqual([ otherUserId ]);
  });

  it('should remove editors', () => {
    // given
    const userId = '1234';
    user.getUserId = jest.fn()
      .mockReturnValueOnce(otherUserId)
      .mockReturnValueOnce(userId)
      .mockReturnValueOnce(otherUserId)
      .mockReturnValueOnce(userId);
    StartChangeInputHandler(Event('INPUT_START_CHANGE', { inputId: '1' }));
    
    // when
    EndChangeInputHandler(Event('INPUT_END_CHANGE', { inputId: '1' }));

    // then
    expect(JSON.parse($input.dataset.editors)).toEqual([ ]);
  });
})