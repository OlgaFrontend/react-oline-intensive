//Core
import React, { Component } from 'react';

//Components
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';

//Instruments
import Styles from './style.m.css';

export default class Feed extends Component {
  render () {
    
    return (
      <section className = { Styles.feed }>
          <StatusBar />
          <Composer />
          <Post />
      </section>
    )
  } 
}