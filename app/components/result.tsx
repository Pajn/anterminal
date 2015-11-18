import * as React from 'react';
import {Card} from './card';

const styles = Object.freeze({
  card: {
    width: 600,
  },
});

export class Result extends React.Component<{result: any, key?}, {}> {

  render() {
    return <Card style={styles.card}>
      {this.props.result}
    </Card>;
  }
}
