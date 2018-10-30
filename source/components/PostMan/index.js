// Core
import React from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

//Instruments
import Styles from './style.m.css';
import { withProfile } from 'components/HOC/withProfile';



const PostMan = (props) => {

  return (
      <section className = { Styles.postman }>
        <img src = { props.avatar } />
        <span>Welcome online, { props.currentUserFirstName }</span>
      </section>
  );
}

export default withProfile(PostMan);