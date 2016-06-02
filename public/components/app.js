import React from 'react';
import { Component } from 'react';

import TargetList from '../containers/targets';
import GroupList from '../containers/group_list';
import GroupDetailView from '../containers/group_detail';

export default class App extends Component {

  render () {
    return (
       <div>
          <GroupList />
          <GroupDetailView />
          {this.props.children}
       </div>
    );
  }
}