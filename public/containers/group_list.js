import React, { Component, PropTypes }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { getModel, deleteModel } from '../actions/model';
import { selectGroup } from '../actions/selectGroup';
import { Link } from 'react-router';

class GroupList extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentDidMount(){
    let user = window.localStorage.getItem('username');
    this.props.getModel('list', '/user/'+ user);
  }

  onDeleteClick(group) {
    if (confirm('are you sure you want to delete ' + group.name + '?')) {
      this.props.deleteModel('name', group.name, 'list')
        .then(() => {
          this.props.getModel('list', '/user/'+ window.localStorage.getItem('username'));
        });
    }
  }

  onSelectClick(group){
    this.props.selectGroup(group);
  }

  renderList () {
    return this.props.groups.map((group) => {
      return (
          <li
          key={ group.name }
          className={this.props.activeGroup.name === group.name ? 'list-group-item active' : 'list-group-item'}>
            <span onClick={ this.onSelectClick.bind(this, group) }>
            { group.name } 
            </span>
            <span
            className="pull-xs-right deletebtn" 
            onClick={ this.onDeleteClick.bind(this, group) }>
            del</span>
          </li>
      )
    })
  }

  render () {
    console.log(this.props);
    return (
      <div className="col-md-3">
      { this.props.isAuthenticated &&
        <div>
          <h2>Group List: </h2>
          <div>
          select below
          {this.renderList()}
          <Link to="groups/new" className="btn btn-primary">New Group</Link>
          </div>
        </div>
      }

      {!this.props.isAuthenticated &&
        <a href='/auth/twitter' className="btn btn-primary">Log In with Twitter</a>
      }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    groups: state.models.__LISTS,
    user:state.user,
    isAuthenticated: state.isAuthenticated,
    activeGroup:state.activeGroup
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getModel, deleteModel, selectGroup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);