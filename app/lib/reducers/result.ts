import {actions} from '../redux/actions';
import {createReducer} from '../redux/helpers';

export type ResultState = any[];

export const results = createReducer([])
  .when(actions.newResult, (state, {result}) => [result, ...state])
  .build();
