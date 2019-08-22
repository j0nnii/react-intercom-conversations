import { combineReducers } from 'redux';
import ui from './uiReducer';
import conversations from './conversationsReducer';
import users from './usersReducer';

export default combineReducers({
  ui,
  conversations,
  users
});
