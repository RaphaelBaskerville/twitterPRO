import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getModel } from '../actions/model';
import { selectGroup } from '../actions/selectGroup';

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
      </ul>
    )
  }
}

function mapStateToProps (state) {
  console.log('state in map state.groups to props function\n', state)
  return {
    groups: state.models.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getModel: getModel, selectGroup: selectGroup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);