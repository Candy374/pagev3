import { createStore, combineReducers } from 'redux';
import chess from './chess';
import setting from './setting';

const reducers = combineReducers({
  chess,
  setting
});

export default createStore(reducers);
