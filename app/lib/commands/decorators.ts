import 'reflect-metadata';

import {Autocomplete, Collection} from '../apis/command';
import {actions} from '../flux/actions';
import {dispatcher} from '../flux/dispatcher';

export function prefix(name: string): ClassDecorator {
  return (target: Function) => { // : Function | void
  };
}

export function command(): MethodDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<Function>) => {
      if (typeof propertyKey === 'string') {
        const args = Reflect.getMetadata('design:paramtypes', target, propertyKey);
        dispatcher.dispatch(actions.registerCommand, {
          name: propertyKey,
          function: descriptor.value,
          arguments: args,
        });
      }
  };
}

export function provide<T>(f: () => Collection<T>): MethodDecorator {
  return <T>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>) => {
      //TODO
  };
}

export function autocomplete<T>(f: Autocomplete): MethodDecorator {
  return <T>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>) => {
      //TODO
  };
}
