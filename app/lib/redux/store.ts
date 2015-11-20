import {Store as ReduxStore, combineReducers, createStore} from 'redux';
import {commands, CommandState} from '../reducers/command';
import {history, HistoryState} from '../reducers/history';
import {results, ResultState} from '../reducers/result';

export type State = {
  commands: CommandState,
  history: HistoryState,
  results: ResultState,
};

export interface Store extends ReduxStore {
  getState(): State;
}

export const store = createStore(combineReducers({commands, history, results})) as Store;
