import * as React from 'react';
import {stateful} from '../lib/redux/helpers';
import {Result} from './result';

const styles = Object.freeze({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 72,
    borderBottom: 'solid 2px gray',
  },
});

@stateful(state => ({results: state.results}))
export class ResultList extends React.Component<{}, {results: any[]}> {

  render() {
    return (
      <div style={styles.container}>
        {this.state.results.map((result, index) => <Result result={result} key={index} />)}
      </div>
    );
  }
}
