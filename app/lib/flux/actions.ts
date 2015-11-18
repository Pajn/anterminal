type Rules = {[key: string]: boolean};

export interface Action<T extends {}|Rules|Array<Rules>> {
  name?: string;
  payload?: T;
}

class Actions {
  registerCommand: Action<{name: string, function: Function, arguments: any[]}> = {};
  runCommand: Action<{command: string}> = {};
  newResult: Action<{result: any}> = {};
}

function createActions(actionDefinitions: Actions) {
  return Object.freeze(
    Object.keys(actionDefinitions).reduce((actions, name) => {
      let actionDefinition = actionDefinitions[name];

      actions[name] = Object.create(actionDefinition);
      actions[name].name = name;
      return actions;
    }, new Actions())
  );
}

export const actions: Actions = createActions(new Actions());
