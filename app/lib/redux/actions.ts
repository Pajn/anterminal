export interface Action<T extends {}> {
  type?: string;
  payload?: T;
}

class Actions {
  registerCommand: Action<{name: string, function: Function, arguments: any[]}> = {};
  runCommand: Action<{command: string}> = {};
  newResult: Action<{result: any}> = {};
}

function createActions(actionDefinitions: Actions) {
  return Object.freeze(
    Object.keys(actionDefinitions).reduce((actions, type) => {
      let actionDefinition = actionDefinitions[type];

      actions[type] = Object.create(actionDefinition);
      actions[type].type = type;
      return actions;
    }, new Actions())
  );
}

export const actions: Actions = createActions(new Actions());
