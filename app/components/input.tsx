import * as React from 'react';
import {runCommand} from '../lib/runner';

const styles = Object.freeze({
  container: {
    padding: 16,
  },
  input: {
    width: 600,
  },
});

export class Input extends React.Component<{}, {}> {

  render() {
    return <div style={styles.container}>
      <input ref='input' onKeyDown={this.runCommand.bind(this)} style={styles.input} />
    </div>;
  }

  private runCommand(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      const command = this.refs['input']['value'];
      // Uncomment when history added: this.refs['input']['value'] = '';
      runCommand(command);
    }
  }
}
