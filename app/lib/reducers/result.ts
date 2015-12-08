import {createReducer} from 'decorated-redux';
import {actions} from '../redux/actions';

export type ResultState = {error: boolean, result}[];

export const results = createReducer([])
  .when(actions.newResult, (state, result) => [result, ...state])
  .build();
