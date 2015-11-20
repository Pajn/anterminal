import {actions} from '../redux/actions';
import {createReducer} from '../redux/helpers';

export type CommandState = {name: string, function: Function, arguments: any[]}[];

export const commands = createReducer<CommandState>([])
  .when(actions.registerCommand, (state, payload) => [...state, payload])
  .build();
