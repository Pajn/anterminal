%lex

NumberLiteral [+-]?[0-9]+(\.[0-9]+)?
IdentifierStart [a-zA-Z]
IdentifierPart {IdentifierStart}|[0-9_]
Identifier {IdentifierStart}{IdentifierPart}*
UnicodeEscapeSequence u[0-9a-fA-F]{4}
SingleEscapeCharacter [\'\"\\\/bfnrt]
EscapeSequence {SingleEscapeCharacter}|{UnicodeEscapeSequence}
DoubleStringCharacter [^\"\\]|(\\{EscapeSequence})
SingleStringCharacter [^\'\\]|(\\{EscapeSequence})
StringLiteral (\"{DoubleStringCharacter}*\")|(\'{SingleStringCharacter}*\')

%%

\s+                                /* skip whitespace */
{NumberLiteral}                    return "NUMBER_LITERAL";
{StringLiteral}                    return "STRING_LITERAL";
{Identifier}                       return "IDENTIFIER";
">"                                return ">";
"_"                                return "_";
"="                                return "=";
"$"                                return "$";
"|"                                return "|";
<<EOF>>                            return 'EOF'
.                                  return "ERROR";

/lex

%start commandLine
%%

commandLine
  : '>' commandList EOF { return $$ = new CommandLineNode($1, $2, createSourceLocation(null, @1, @2)); }
  | commandList EOF { return $$ = new CommandLineNode(null, $1, createSourceLocation(null, @1, @1)); }
  ;

commandList
  : command { $$ = [$1]; }
  | commandList '|' command { $$ = $1.concat($3); }
  ;

command
  : 'IDENTIFIER' { $$ = new CommandNode($1, [], createSourceLocation(null, @1, @1)); }
  | 'IDENTIFIER' argumentList  { $$ = new CommandNode($1, $2, createSourceLocation(null, @1, @2)); }
  ;

argumentList
  : argument { $$ = [$1]; }
  | argumentList argument { $$ = $1.concat($2); }
  ;

argument
  : namedArgument
  | simpleArgument { $$ = new SimpleArgumentNode($1, createSourceLocation(null, @1, @1)); }
  | pipeInputArgument
  ;

namedArgument
  : 'IDENTIFIER' '=' argument { $$ = new NamedArgumentNode($1, $3, createSourceLocation(null, @1, @3)); }
  ;

simpleArgument
  : 'IDENTIFIER'
  | numberLiteral
  | 'STRING_LITERAL'
  ;

pipeInputArgument
  : '_' { $$ = new PipeInputArgumentNode(createSourceLocation(null, @1, @1)); }
  ;

numberLiteral
  : 'NUMBER_LITERAL' { $$ = parseInt($1, 10); }
  ;

%%

function createSourceLocation(source, firstToken, lastToken) {
	return new SourceLocation(source, new Position(firstToken.first_line, firstToken.first_column), new Position(lastToken.last_line, lastToken.last_column));
}

/* Begin AST Node Constructors */
function CommandLineNode(continueToken, commandList) {
	this.type = "CommandLine";
	this.continueToken = continueToken;
	this.commandList = commandList;
}

function CommandNode(commandName, arguments) {
	this.type = "Command";
	this.commandName = commandName;
	this.arguments = arguments;
}

function NamedArgumentNode(name, value) {
	this.type = "NamedArgument";
	this.name = name;
	this.value = value;
}

function SimpleArgumentNode(value) {
	this.type = "Argument";
	this.value = value;
}

function PipeInputArgumentNode() {
	this.type = "PipeInputArgument";
}

function SourceLocation(source, start, end) {
	this.source = source;
	this.start = start;
	this.end = end;
}

function Position(line, column) {
	this.line = line;
	this.column = column;
}

/* End AST Node Constructors */

/* Expose the AST Node Constructors */
parser.ast = {};
parser.ast.CommandLineNode = CommandLineNode;
parser.ast.CommandNode = CommandNode;
parser.ast.NamedArgumentNode = NamedArgumentNode;
parser.ast.SimpleArgumentNode = SimpleArgumentNode;
