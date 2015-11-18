import {Subject, Observable} from 'rx';
import {Action} from './actions';
import {dispatcher} from './dispatcher';

export class Store {
  onChange: Observable<{action: Action<any>, payload}>;

  private _onChange: Subject<{action: Action<any>, payload}>;

  constructor() {
    this._onChange = new Subject<{action: Action<any>, payload}>();
    this.onChange = this._onChange.asObservable();
  }

  /**
   * Listens to the specified action.
   * If the handler does not return false an onChange event is emitted.
   */
  on<T>(action: Action<T>, handler: (payload: T) => Promise<any>|any) {
    dispatcher.on(action, async (payload) => {
      const isChanged = await handler(payload);
      if (isChanged || typeof isChanged !== 'boolean') {
        this._onChange.onNext({action, payload});
      }
    });
  }
}
