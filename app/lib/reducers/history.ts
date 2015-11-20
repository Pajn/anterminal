import {actions} from '../redux/actions';
import {createReducer} from '../redux/helpers';

export type HistoryState = string[];

export const history = createReducer<HistoryState>([])
  .when(actions.runCommand, (state, {command}) => [...state, command])
  .build();
