import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

import TargetList from '../containers/targets';

export default class App extends Component {

  componentWillMount() {
    let query = this.props.location.search;
    if (!window.localStorage.token && query.length > 0) {
      console.log('saving query');
      window.localStorage.token = this.props.location.search;
    }
  }

  render () {
    console.log('App window location url', this.props.location.search);
    console.log('App localstorage twitter', window.localStorage.twitter);
    return (
       <div>
          <h1>TwiDerpRo</h1>
          {this.props.children}
       </div>
    );
  }
}