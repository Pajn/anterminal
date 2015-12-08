import * as React from 'react';
import {stateful} from '../lib/redux/store';
import {Result} from './result';

const styles = require('./result-list.scss');

@stateful(state => ({results: state.results}))
export class ResultList extends React.Component<{}, {results: {error: boolean, result}[]}> {

  render() {
    return (
      <div className={styles.container}>
        {this.state.results.map((result, index) => <Result result={result} key={index} />)}
      </div>
    );
  }
}
