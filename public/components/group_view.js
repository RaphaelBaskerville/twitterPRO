import React, { Component } from 'react';

import GroupList from '../containers/group_list';
import GroupDetail from '../containers/group_detail';

export default class GroupView extends Component {
  render () {
    return (
      <div>
        <GroupList />
        {this.props.children}
      </div>
    );
  }
}
