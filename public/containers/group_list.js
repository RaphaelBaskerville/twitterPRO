import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getModel } from '../actions/model';
import { selectGroup } from '../actions/selectGroup';
import { Link } from 'react-router';

class GroupList extends Component {
  componentDidMount(){
    this.props.getModel('list', '/all/true', 'NEW_MODELS');
  }
  renderList () {
    console.log('props in GroupList', this.props);
    return this.props.groups.map((group) => {
      return (
        <li
        key={ group.name }
        onClick={ (e) => {
          this.props.selectGroup(group)
          } 
        }
        className='list-group-item' 
      > { group.name } </li>
      )
    })
  }

  render () {
    return (
      <ul className="list-group col-sm-4 red">
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
  return bindActionCreators({ getModel: getModel, selectGroup: selectGroup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);