import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import transactions from './transactions/reducer';

const reducers = combineReducers({
  menu,
  settings,
  transactions,
});

export default reducers;
