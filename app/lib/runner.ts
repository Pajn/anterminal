import {actions} from './flux/actions';
import {dispatcher} from './flux/dispatcher';
const {commandStore} = require('./stores/command');
const {resultStore} = require('./stores/result');
const {parse} = require('./grammar');

export function runCommand(command: string) {
  dispatcher.dispatch(actions.runCommand, {command});

  const commandLine = parse(command);
  const commands = commandLine.commandList.map(c => ({
    written: c,
    registered: commandStore.commands.find(r => r.name === c.commandName),
  }));

  for (let {registered} of commands) {
    if (!registered) {
      console.log('unkown command', command);
      return;
    }
  }

  let pipeValue;

  if (commandLine.continueToken) {
    pipeValue = resultStore.results[0];
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

  dispatcher.dispatch(actions.newResult, {result: pipeValue});
}
