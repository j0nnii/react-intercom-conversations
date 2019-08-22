import { changeTab } from 'actions';

describe('saveComment', () => {
  it('has the correct type', () => {
    const action = changeTab();
    expect(action.type).toEqual('CHANGE_TAB');
  });
  it('has the correct payload', () => {
    const action = changeTab(true);
    expect(action.payload).toEqual(true);
  });
});
