import * as React from 'react';
import {Card} from './card';

const styles = require('./result.scss');

export class Result extends React.Component<{result: any, key?}, {}> {

  render() {
    const {error, result} = this.props.result;

    return (
      <Card className={styles.Card + ' ' + (error && styles.error)}>
        {
          Array.isArray(result)
          ? this.renderList(result)
          : result
        }
      </Card>
    );
  }

  private renderList(result: any[]) {
    return (
      <ul className={styles.list}>
        {result.map((result, i) => <li key={i}>{result}</li>)}
      </ul>
    );
  }
}
