# Anterminal
An experiment to bring the terminal into the current century.
Today we essentially emulate vt100, a terminal released in 1978. At that time, text were the
common tongue between programs and systems. Today we're more into JSON.

Anterminal is built on web technologies and is planned as an electron application, however currently
it runs in the browser which means that no things that require system access can be implemented.
But this also means that it can be run from [gh-pages](https://pajn.github.io/anterminal/).

## Exampels
### Basic math
`add 3 5`

### Pipe commands
`add 3 5 | multiply 2`

### Piped value as positioned argument
`add 3 5 | subtract _ 2`

### Pipe arrays to commends operating on values
`range 10 | multiply 2`

### Pipe to commands that specifies custom output format
`range 200 | log | multiply 2 | round | chart`
