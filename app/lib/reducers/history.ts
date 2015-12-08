import {createReducer} from 'decorated-redux';
import {actions} from '../redux/actions';

export type HistoryState = string[];

export const history = createReducer<HistoryState>([])
  .when(actions.runCommand, (state, {command}) => [command, ...state])
  .build();
