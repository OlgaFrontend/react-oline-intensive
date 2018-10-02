//Core
import React, { Component } from 'react';

//Components
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner';

//Instruments
import Styles from './style.m.css';

export default class Feed extends Component {
  
  state = {
    posts: [
      { id: '123', comment: 'Hello:)', created: 1526825076849 },
      { id: '234', comment: 'Hi!', created: 1526825076855 }
    ],
    isPostFetching: true
  }

  render () {
    const { posts, isPostFetching } = this.state;

    const postsJSX = posts.map((post) => {
        return <Post key = { post.id } { ...post } />;
    });

    return (
      <section className = { Styles.feed }>
          <Spinner isSpinning = { isPostFetching }/>
          <StatusBar />
          <Composer />
          {postsJSX}
      </section>
    )
  } 
}