import {actions} from '../flux/actions';
import {Store} from '../flux/store';

export class HistoryStore extends Store {
  commands = [];

  constructor() {
    super();

    super.on(actions.runCommand, ({command}) => this.commands.push(command));
  }
}

export const historyStore = new HistoryStore();
