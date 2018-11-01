// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import StatusBar from 'components/StatusBar';
import Login from 'components/Login';
import { Provider } from 'components/HOC/withProfile';

//Instruments
import avatar from 'theme/assets/lisa';
  
@hot(module)
export default class App extends Component {
    state = {
        avatar,
        currentUserFirstName: 'Ольга',
        currentUserLastName: 'Дубинка',
        isLogIn:           false,
    };
    _logIn = (state) => {
        this.setState({
            isLogIn: true,
        });
    }
    _logOut = (state) => {
        this.setState({
            isLogIn: false,
        });
    }
    render () {
        const { isLogIn } = this.state;

        return (
            <Catcher>
                {
                    <Provider value = { this.state }>
                        {
                            (isLogIn ? <StatusBar _logOut = { this._logOut } /> : <Login _logIn = { this._logIn }/>)
                        }
                        <Switch>
                            <Route component = { Feed } path = '/feed' />
                            <Route component = { Profile } path = '/profile' />
                            {
                                !isLogIn ? (
                                    <Route component = { Login } path = '/login' /> &&
                                    <Login _logIn = { this._logIn } />
                                    
                                ):null
                            }
                            {
                                isLogIn ? <Redirect to = '/feed' /> : <Redirect to = '/login' />
                            }
                        </Switch>
                    </Provider>
                }
            </Catcher>
        );
    }
}
