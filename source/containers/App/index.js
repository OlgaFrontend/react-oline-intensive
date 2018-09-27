// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//Components
import Feed from 'components/Feed';
import avatar from 'theme/assets/lisa';

const options = {
    avatar,
    currentUserFirstName: 'Lisa',
    currentUserLastName: 'Simpson'
}
  
export default class App extends Component {
    render () {

        return (
           <Feed { ...options }/>
        );
    }
}
