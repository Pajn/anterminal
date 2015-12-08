import {actions} from './redux/actions';
import {dispatch} from './redux/store';
import {store} from './redux/store';
const {parse} = require('./grammar');

export function runCommand(command: string) {
  dispatch(actions.runCommand, {command});

  const commandLine = parse(command);
  const commands = commandLine.commandList.map(c => ({
    written: c,
    registered: store.getState().commands.find(r => r.name === c.commandName),
  }));

  for (let {registered, written} of commands) {
    if (!registered) {
      dispatch(actions.newResult, {error: true, result: `Unkown command "${written.commandName}"`});
      return;
    }
  }

  let pipeValue;

  if (commandLine.continueToken) {
    pipeValue = store.getState().results[0];
  }

  for (let {registered, written} of commands) {
    const args = written.arguments;
    if (pipeValue !== undefined) {
      const pipeInput = args.findIndex(arg => arg.type === 'PipeInputArgument');
      const pipeArg = (pipeInput === -1) ? args.length : pipeInput;

      if (Array.isArray(pipeValue) && registered.arguments[pipeArg] !== Array) {
        pipeValue = pipeValue.map(value => {
          const mapArgs = args.concat();
          mapArgs[pipeArg] = Object.assign((mapArgs[pipeArg] || {}), {value});
          return registered.function.apply(null, mapArgs.map(({value}) => value));
        });
        continue;
      }

      args[pipeArg] = Object.assign((args[pipeArg] || {}), {value: pipeValue});
    }
    pipeValue = registered.function.apply(null, args.map(({value}) => value));
  }

  dispatch(actions.newResult, {error: false, result: pipeValue});
}
