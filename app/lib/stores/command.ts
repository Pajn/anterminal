import {actions} from '../flux/actions';
import {Store} from '../flux/store';

export class CommandStore extends Store {
  commands: {name: string, function: Function, arguments: any[]}[] = [];

  constructor() {
    super();

    super.on(actions.registerCommand, (payload) => {
      this.commands.push(payload);
    });
  }
}

export const commandStore = new CommandStore();
