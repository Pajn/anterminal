import * as React from 'react';
import {StatefulComponent} from '../lib/flux/stateful-component';
import {resultStore} from '../lib/stores/result';
import {Result} from './result';

// Hack to workaround unused React bug in tslint
export const _ = React;

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

export class ResultList extends StatefulComponent<{}, {results: any[]}> {
  stores = [resultStore];

  getState() {
    return {
      results: resultStore.results,
    };
  }

  render() {
    return <div style={styles.container}>
      {this.state.results.map((result, index) => <Result result={result} key={index} />)}
    </div>;
  }
}
