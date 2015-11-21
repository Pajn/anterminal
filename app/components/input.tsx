import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {runCommand} from '../lib/runner';
import {stateful} from '../lib/redux/helpers';

const styles = Object.freeze({
  container: {
    padding: 16,
  },
  input: {
    width: 600,
  },
});

type State = {historyIndex: number, history?: any[], value: string};

@stateful(state => ({history: state.history}))
export class Input extends React.Component<{}, State> {

  constructor(props){
    super(props);

    this.state = {historyIndex: -1, value: ''};
  }

  render() {
    return <div style={styles.container}>
      <input ref='input' onChange={this.onChange.bind(this)} onKeyDown={this.runCommand.bind(this)}
             style={styles.input} value={this.state.value} />
    </div>;
  }

  private moveCursorToEnd() {
    const input = findDOMNode(this.refs['input']) as HTMLInputElement;
    const position = input.value.length;
    input.setSelectionRange(position, position);
  }

  private onChange(event) {
    this.setState({value: event.target.value} as State);
  }

  private runCommand(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      const command = this.state.value;
      this.setState({historyIndex: -1, value: ''});
      runCommand(command);
    } else if (event.keyCode === 38) {
      if (this.state.historyIndex < this.state.history.length - 1) {
        const historyIndex = this.state.historyIndex + 1;
        this.setState({
          historyIndex,
          value: this.state.history[historyIndex],
        }, () => this.moveCursorToEnd());
        event.preventDefault();
      }
    } else if (event.keyCode === 40) {
      if (this.state.historyIndex > -1) {
        const historyIndex = this.state.historyIndex - 1;
        this.setState({
          historyIndex,
          value: this.state.history[historyIndex],
        }, () => this.moveCursorToEnd());
        event.preventDefault();
      }
    }
  }
}
