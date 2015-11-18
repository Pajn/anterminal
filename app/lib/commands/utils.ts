import {ObjectCommandResult} from '../apis/command';
import {command} from './decorators';

class Utils {

  @command()
  property(property: string, object) {
    return object[property];
  }

  @command()
  primary(property: string, prev: ObjectCommandResult): ObjectCommandResult {
    return {
      primaryProperty: property,
      result: prev.result,
    };
  }

  @command()
  sort(values: Array<any>, property?: string) {
    return values.sort((a, b) => {
      if (typeof a === 'object') {
        a = a[property];
        b = b[property];
      }
      if (typeof a === 'string') {
        return a.localeCompare(b);
      } else if (typeof a === 'number') {
        return a - b;
      } else {
        return 0;
      }
    });
  }

  @command()
  head(amount: number = 10, values: Array<any>, {start = 0} = {}) {
    return values.slice(start, start + amount);
  }

  @command()
  tail(amount: number = 10, values: Array<any>) {
    return values.slice(values.length - amount);
  }

  @command()
  range(length: number, start = 1, step = 1) {
    const end = start + length;
    let rangea = [];

    for (let i = start; i < end; i += step) {
      rangea.push(i);
    }

    return rangea;
  }
}
