// Core
import React, { Component } from 'react';

// Instruments
import { object } from 'prop-types';
import Styles from './style.m.css';

export default class Catcher extends Component {
  static propTypes = {
    children: object.isRequired,
  };

  state = {
    error: false,
  }

  componentDidCatch (error, stack) {
    console.log('ERROR:', error);
    console.log('STACKTRACE:', stack.componentStack);

    this.setState({
      error: true,
    });
  }

  render () {
    if(this.state.error) {
      return (
        <section className = { Styles.catcher }>
          <span>A misterious error occured.</span>
          <p>Our space engineers fixing that already</p>
        </section>
      )
    }

    return this.props.children;
  }
}
