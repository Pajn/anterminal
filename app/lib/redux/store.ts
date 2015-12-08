import {reactStore} from 'decorated-redux/react';
import {combineReducers, createStore} from 'redux';
import {commands, CommandState} from '../reducers/command';
import {history, HistoryState} from '../reducers/history';
import {results, ResultState} from '../reducers/result';

export type State = {
  commands: CommandState,
  history: HistoryState,
  results: ResultState,
};

export const store = createStore(combineReducers({commands, history, results}));
const helpers = reactStore<State>(store);

export const dispatch = helpers.dispatch;
export const stateful = helpers.stateful;
