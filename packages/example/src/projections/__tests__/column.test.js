import Column from '../column.js';
import Input from '../../components/input/input.js';


const mockInput = document.createElement('input');

jest.mock('../../components/input/input.js', () => {
  return jest.fn().mockImplementation((id, text, dispatch) => {
    return mockInput;
  });
});


describe('Column Projection', () => {
  it('should create an empty column', () => {
    // when
    const $column = Column(jest.fn(), '1234');

    // then
    expect($column.className).toContain('column');
    expect($column.id).toBe('column-1234');
    expect(Input).toBeCalledTimes(1);
  });

  it('should dispatch click events', () => {
    // given
    const dispatch      = jest.fn();
    const $column       = Column(dispatch, '1234');
    const $addCard      = $column.querySelector('.card-add');
    const $removeColumn = $column.querySelector('.column-remove');

    // when
    $addCard.dispatchEvent(new Event('click'));

    // then
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: 'CARD_CREATED' }));
    dispatch.mockReset();

    // when
    $removeColumn.dispatchEvent(new Event('click'));

    // then
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(expect.objectContaining({ type: 'COLUMN_REMOVED' }));
  });
})