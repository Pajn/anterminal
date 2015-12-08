import * as React from 'react';

const styles = require('./card.scss');

export class Card extends React.Component<{className?: string, children?: JSX.Element[]}, {}> {

  render() {
    const className = this.props.className || '';

    return (
      <div className={styles.container + ' ' + className}>
        {this.props.children}
      </div>
    );
  };
}
