import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Targets from './targets';
import Messages from './messages';
import Hashtags from './hashtags';

class GroupDetailView extends Component {
  render () {
    return (
      <div className='detail-view col-sm-9'>
      <h2>{ this.props.activeGroup ? this.props.activeGroup.name.toUpperCase() : "Please Choose a Group"}</h2>
      <Targets />
      <Messages />
      <Hashtags />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeGroup: state.activeGroup
  };
}


export default connect(mapStateToProps)(GroupDetailView);