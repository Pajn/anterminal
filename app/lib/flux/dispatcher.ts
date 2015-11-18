import {Dispatcher as FacebookDispatcher} from 'flux';
import {Action} from './actions';

export const facebookDispatcher = new FacebookDispatcher<{action: Action<any>, payload: any}>();

export class Dispatcher {

  dispatch<T>(action: Action<T>, payload?: T) {
    facebookDispatcher.dispatch({action, payload});
  }

  on<T>(action: Action<T>, callback: (payload: T) => Promise<any>|any) {
    return this.listen<T>((dispatchedAction, payload) => {
      if (dispatchedAction.name === action.name) {
        return callback(payload);
      }
    });
  }

  listen<T>(callback: (action: Action<T>, payload: T) => Promise<any>|any) {
    return facebookDispatcher.register((dispatch) => {
      let ret = callback(dispatch.action, dispatch.payload);

      // Make sure an rejected promise are thrown
      // Should not be needed with real ES6 promises
      if (ret && typeof ret.then === 'function') {
        ret.catch((e) => setTimeout(() => {throw e; }));
      }
    });
  }
}

export const dispatcher = new Dispatcher();
