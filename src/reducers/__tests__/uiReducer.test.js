import uiReducer from 'reducers/uiReducer';

it('handles actions of type CHANGE_TAB', () => {
  const action = {
    type: 'CHANGE_TAB',
    payload: true
  };
  const newState = uiReducer([], action);
  expect(newState).toEqual({ tab: true });
});

it('handles action with unknown type', () => {
  const newState = uiReducer([], { type: 'LALALLAA' });
  expect(newState).toEqual([]);
});
