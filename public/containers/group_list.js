import React, { Component, PropTypes }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getModel, removeGroup } from '../actions/model';
import { selectGroup } from '../actions/selectGroup';
import { Link } from 'react-router';

class GroupList extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.removeGroup = removeGroup.bind(this);
  }
  componentDidMount(){
    let user = window.localStorage.getItem('username');
    this.props.getModel('list', '/user/'+ user, 'NEW_MODELS');
  }
  renderList () {
    console.log('props in GroupList', this.props);
    return this.props.groups.map((group) => {
      return (
        <li
        key={ group.name }
        onClick={ (e) => {
          this.props.selectGroup(group)
          this.context.router.push('/groups')
          } 
        }
        className='list-group-item' 
      > { group.name } 
      <span
        className="pull-xs-right deletebtn" 
        onClick={(e) => {
          console.log('delete')
          e.stopPropagation()
          this.props.removeGroup(group)
          }
        }>del</span>
      </li>
      )
    })
  }

  render () {
    console.log(this.props.groups);
    return (
      <ul className="col-sm-4 red">
      <h2>Group List: </h2>
      select below
      {this.renderList()}
      <Link to="groups/new" className="btn btn-primary">New Group</Link>
      </ul>
    )
  }
}

function mapStateToProps (state) {
  console.log('GroupList STATE\n', state)
  return {
    groups: state.models.list,
    user:state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getModel, removeGroup, selectGroup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);