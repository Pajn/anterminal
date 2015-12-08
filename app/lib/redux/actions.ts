import {Action, createActions} from 'decorated-redux';

class Actions {
  registerCommand: Action<{name: string, function: Function, arguments: any[]}> = {};
  runCommand: Action<{command: string}> = {};
  newResult: Action<{error: boolean, result: any}> = {};
}

export const actions = createActions(Actions);
