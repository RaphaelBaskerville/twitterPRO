import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

import TargetList from '../containers/targets';

export default class App extends Component {

  render () {
    return (
       <div>
          <h1>TwiDerpRoWWW</h1>
          {this.props.children}
       </div>
    );
  }
}