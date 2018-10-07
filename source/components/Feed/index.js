//Core
import React, { Component } from 'react';
import moment from 'moment';

//Components
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner';

//Instruments
import Styles from './style.m.css';
import { getUniqueID, delay } from 'instruments';

export default class Feed extends Component {

  constructor () {
    super();

    this._createPost = this._createPost.bind(this);
    this._setPostFetchingState = this._setPostFetchingState.bind(this);
    this._likePost = this._likePost.bind(this);
    this._removePost = this._removePost.bind(this);
  
  }
  
  state = {
    posts: [
      { id: '123', comment: 'Hello:)', created: 1526825076849, likes: [], },
      { id: '234', comment: 'Hi!', created: 1526825076855, likes: [], },
    ],
    isPostFetching: false,
  }

  _setPostFetchingState (state) {
    this.setState({
      isPostFetching: state,
    });
  }

  async _createPost (comment) {
    this._setPostFetchingState(true);

    const post = {
      id: getUniqueID(),
      created: moment.now(),
      comment,
      likes: [],
    };

    await delay(1200);

    this.setState(({ posts }) => ({
      posts: [post, ...posts],
      isPostFetching: false,
    }));
  }

  async _likePost (id) {
    const { currentUserFirstName, currentUserLastName } = this.props;

    this._setPostFetchingState(true);

    await delay(1200);

    const newPosts = this.state.posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          likes: [
            {
              id:        getUniqueID(),
              firstName: currentUserFirstName,
              lastName:  currentUserLastName,
            }
          ],
        };
      }

      return post;
    });

    this.setState({
      posts:          newPosts,
      isPostFetching: false,
    });
  }

  async _removePost (id) {
    this._setPostFetchingState(true);

    await delay(1200);

    this.setState(({ posts }) => ({
      posts:          posts.filter((post) => post.id !== id),
      isPostFetching: false,
    }));

    // this.setState({
    //   posts:          this.state.posts.filter((post, id) => {
    //     console.log(post.id);
    //     console.log(id);
    //     return post.id !== id;
    //   }),
    //   isPostFetching: false,
    // });
    
  }

  render () {
    const { posts, isPostFetching } = this.state;

    const postsJSX = posts.map((post, id) => {
        return <Post 
                  key = { post.id } 
                  { ...post } 
                  _likePost = { this._likePost } 
                  _removePost = { this._removePost }/>
    });

    return (
      <section className = { Styles.feed }>
          <Spinner isSpinning = { isPostFetching }/>
          <StatusBar />
          <Composer _createPost = { this._createPost }/>
          {postsJSX}
      </section>
    )
  } 
}