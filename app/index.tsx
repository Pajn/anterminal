require('babel-polyfill');

import * as React from 'react';
import {render} from 'react-dom';

import {Input} from './components/input';
import {ResultList} from './components/result-list';

import './lib/commands/math';
import './lib/commands/renders';
import './lib/commands/utils';

const styles = Object.freeze({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  main: {
    flex: 1,
    color: 'whitesmoke',
    backgroundColor: 'rgb(40, 44, 52)',
  },
});

class App extends React.Component<{}, {}> {

  render() {
    return (
      <div style={styles.container}>
        <Input />
        <ResultList />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
