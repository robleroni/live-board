import Card from '../card.js';
import Input from '../../components/input/input.js';


const mockInput = document.createElement('input');

jest.mock('../../components/input/input.js', () => {
  return jest.fn().mockImplementation((id, text, dispatch) => {
    return mockInput;
  });
});

describe('Card Projection', () => {
  it('should create an empty card', () => {
    // when
    const $card = Card(jest.fn(), '1234');

    // then
    expect($card.className).toContain('card');
    expect($card.id).toBe('card-1234');
    expect(Input).toBeCalledTimes(1);
  });

  it('should dispatch click events', () => {
    // given
    const dispatch    = jest.fn();
    const $card       = Card(dispatch, '1234');
    const $removeCard = $card.querySelector('button');

    // when
    $removeCard.dispatchEvent(new Event('click'));

    // then
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: 'CARD_REMOVED' }));
  });
})