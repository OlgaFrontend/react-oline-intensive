//Core
import React, { Component } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner';

//Instruments
import Styles from './style.m.css';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';

@withProfile
export default class Feed extends Component {
  
  state = {
    posts: [],
    isPostFetching: false,
  }

  componentDidMount () {
    const { currentUserFirstName, currentUserLastName } = this.props;

    this._fetchPosts();
    socket.emit('join', GROUP_ID);

    socket.on('create', (postJSON) => {
      const { data: createdPost, meta } = JSON.parse(postJSON);

      if(
        `${currentUserFirstName} ${currentUserLastName}` !==
        `${meta.authorFirstName} ${meta.authorLastName}`
      ) {
        this.setState(({ posts }) => ({
          posts: [createdPost, ...posts],
        }))
      }
    });

    socket.on('remove', (postJSON) => {
      const { data: removedPost, meta } = JSON.parse(postJSON);

      if(
        `${currentUserFirstName} ${currentUserLastName}` !==
        `${meta.authorFirstName} ${meta.authorLastName}`
      ) {
        this.setState(({ posts }) => ({
          posts: posts.filter((post) => post.id !== removedPost.id),
        }));
      }
    });

    socket.on('like', (postJSON) => {
      const { data: likedPost, meta } = JSON.parse(postJSON);

      this.setState(({ posts }) => ({
        posts: posts.map(
          (post) => post.id === likedPost.id ? likedPost : post,
        ),
        isPostFetching: false,
      }));
    });

  }

  componentWillMount () {
    socket.removeListener('create');
    socket.removeListener('remove');
    socket.removeListener('like');
  }

  _setPostFetchingState = (state) => {
    this.setState({
      isPostFetching: state,
    });
  }

  _fetchPosts = async () => {
    this._setPostFetchingState(true);

    const response = await fetch(api, {
      method: 'GET',
    });

    const { data: posts } = await response.json();
    
    this.setState({
      posts,
      isPostFetching: false,
    });
  };

  _createPost = async (comment) => {
    this._setPostFetchingState(true);

    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
      },
      body: JSON.stringify({comment}),
    });

    const { data: post } = await response.json();

    this.setState(({ posts }) => ({
      posts:          [post, ...posts],
      isPostFetching: false,
    }));
  }

  _likePost = async (id) => {
    this._setPostFetchingState(true);

    const response = await fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: TOKEN,
      },
    });

    const { data: likedPost } = await response.json();

    this.setState(({ posts }) => ({
      posts: posts.map(
        (post) => post.id === likedPost.id ? likedPost : post,
      ),
      isPostFetching: false,
    }));
  }

  _removePost = async (id) => {
    this._setPostFetchingState(true);

    await fetch(`${api}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: TOKEN,
      },
    });

    this.setState(({ posts }) => ({
      posts:          posts.filter((post) => post.id !== id),
      isPostFetching: false,
    }));
  }

  render () {
    const { posts, isPostFetching } = this.state;

    const postsJSX = posts.map((post, id) => {
        return (
                <Catcher key = { post.id }>
                    <Post  
                        { ...post } 
                        _likePost = { this._likePost } 
                        _removePost = { this._removePost }
                    />
                </Catcher>
                )
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