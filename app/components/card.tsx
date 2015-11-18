import * as React from 'react';

const styles = Object.freeze({
  container: {
    margin: 16,
    padding: 8,
    color: 'black',
    backgroundColor: 'white',
  },
});

export class Card extends React.Component<{style?: Object, children?: JSX.Element[]}, {}> {

  render() {
    return <div style={Object.assign({}, styles.container, this.props.style)}>
      {this.props.children}
    </div>;
  };
}
