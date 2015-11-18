export interface UsableInCommand {
  display(): {primary: string, secondary?: string};
}

export type Value<T> = T | Promise<T>;
export type Collection<T> = T[] | Promise<T[]>;
export type Autocomplete = (written: string) => Collection<string>;

export interface Command {
  name: string;
  autocomplete: Autocomplete;
  onlyPiped: boolean;
}

export type CommandResult = PrimitiveCommandResult | ObjectCommandResult;
export type PrimitiveValue = number | string | boolean;
export type ObjectValue = {[property: string]: PrimitiveValue};

export interface PrimitiveCommandResult {
  result: Result<PrimitiveValue> | Result<PrimitiveValue>[];
}

export interface ObjectCommandResult {
  /**
   * The property to use when a PrimitiveValue is expected
   */
  primaryProperty: string;
  result: Result<ObjectValue> | Result<ObjectValue>[];
}

export function isObject(result: CommandResult): result is ObjectCommandResult {
  return (result as ObjectCommandResult).primaryProperty !== undefined;
}

export interface Result<T> {
  nextCommand: string;
  value: T;
}
