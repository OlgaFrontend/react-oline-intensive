// Core
import React from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

//Instruments
import Styles from './style.m.css';
import { withProfile } from 'components/HOC/withProfile';



const PostMan = (props) => {

  const _animatePostManEnter = (postman) => {
    fromTo(postman, 1, { x: '100%' }, { x: '0%' });
  }

  const _animatePostManEntered = (postman) => {
    fromTo(postman, 2, { opacity: 1 }, { opacity: 0 });
  }

  return (
    <Transition
        appear
        in
        timeout = { 4000 }
        onEnter = { _animatePostManEnter }
        onEntered = { _animatePostManEntered }>
        <section className = { Styles.postman }>
          <img src = { props.avatar } />
          <span>Welcome online, { props.currentUserFirstName }</span>
        </section>
    </Transition>
  );
}

export default withProfile(PostMan);