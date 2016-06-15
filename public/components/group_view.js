import React, { Component } from 'react';

import GroupList from '../containers/group_list';
import GroupDetail from '../containers/group_detail';
import D3svg from '../containers/d3';

export default class GroupView extends Component {
  render () {
    return (
      <div>
        <GroupList />
        {this.props.children}
        <D3svg className='chart' />
      </div>
    );
  }
}
