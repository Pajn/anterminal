import {actions} from '../flux/actions';
import {Store} from '../flux/store';

export class ResultStore extends Store {
  results = [];

  constructor() {
    super();

    super.on(actions.newResult, ({result}) => this.results.splice(0, 0, result));
  }
}

export const resultStore = new ResultStore();
