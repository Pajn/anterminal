export function parse(input: string): CommandLineNode;

declare interface AstNode {
  type: string;
}

declare interface CommandLineNode extends AstNode {
  continueToken: string;
  commandList: CommandNode[];
}

declare interface CommandNode extends AstNode {
  commandName: string;
  arguments: Argument[];
}

declare interface Argument extends AstNode {
  commandName: string;
  value: any;
}

declare interface NamedArgumentNode extends Argument {
  name: string;
}
