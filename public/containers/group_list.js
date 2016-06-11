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

  onDeleteClick(props) {
    console.log('on DeleteClick props',arguments)
    console.log('on DeleteClick this',this)
    this.props.deleteModel('name',group.name,'list')
      .then( browserHistory.push('/groups') );
  }

  renderList () {
    console.log('props in GroupList', this.props);
    return this.props.groups.map((group) => {
      return (
          <li
          key={ group.name }
          className='list-group-item'>
            <span onClick={ (e) => { 
              this.props.selectGroup(group) 
              this.context.router.push('/groups') 
              } 
            }>
            { group.name } 
            </span>
            <span
            className="pull-xs-right deletebtn" 
            onClick={this.onDeleteClick.bind(this)}>
            del</span>
          </li>
      )
    })
  }

  render () {
    console.log('groupList props: ',this.props);
    return (
      <div>
      {this.props.isAuthenticated &&
        <ul className="col-sm-4 red">
        <h2>Group List: </h2>
        select below
        {this.renderList()}
        <Link to="groups/new" className="btn btn-primary">New Group</Link>
        </ul>
      }

      {!this.props.isAuthenticated &&
        <a href='/auth/twitter' className="btn btn-primary">Log In with Twitter</a>
      }
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log('state: ', state)
  return {
    groups: state.models.__LISTS,
    user:state.user,
    isAuthenticated: state.isAuthenticated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getModel, deleteModel, selectGroup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);