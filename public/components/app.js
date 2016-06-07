import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

import TargetList from '../containers/targets';
import loginActions from '../actions/login';
import jwtDecode from 'jwt-decode';

export default class App extends Component {

  componentWillMount() {
    // console.log('component will mount');
    // console.log(window.localStorage);
    // let query = window.localStorage.token;
    // console.log('saving query', query);
    // let data = jwtDecode(query);
    // console.log('the decoded token', data._doc);

    // fetch('/getUserFromJWT/'+query.substr(), {method: 'POST'})
    // .then(function (user) {
    //   console.log('fetched user from jwt', user);
    //   loginActions.receiveLogin(user);
    // });
    
  }

  render () {
    return (
       <div>
       <Link to='/'><h1>TwiDerpRo</h1></Link>
          {this.props.children}
       </div>
    );
  }
}