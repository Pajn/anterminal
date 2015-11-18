import * as React from 'react';
import {Disposable} from 'rx';
import {Store} from './store';

/**
 * A helper for components that uses stores.
 *
 * Usage:
 * Assign an array of the stores you use to the member variable stores.
 * Override the getState method and return a state.
 *
 * This class will handle subscription of onChange event and call getState to get the current state,
 * disposing of those subscriptions and set initial state using getState.
 */
export abstract class StatefulComponent<P, S> extends React.Component<P, S> {
  protected stores: Store[];
  private subscriptions: Disposable[] = [];

  constructor(props) {
    super(props);
    this.state = this.getState();
  }

  abstract getState(): S;

  syncState() {
    this.setState(this.getState());
  }

  componentDidMount() {
    this.subscriptions = this.stores.map((store) =>
      store.onChange.subscribe(() => this.syncState()));
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.dispose());
  }
}
