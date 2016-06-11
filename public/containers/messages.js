import React, { Component }  from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getModel } from '../actions/model';

class MessagesList extends Component {
  componentDidMount(){
    this.props.getModel('message', '/all/true', 'NEW_MODELS');
  }
  
  renderList () {
    var groupMessages;
    if (this.props.activeGroup) {
      groupMessages = this.props.messages.filter((message) => { return message.list === this.props.activeGroup.name; });
      return groupMessages.map((message) => {
        return (
          <li
          className='list-group-item' 
          key={ message.text }> 
          { message.text}
          </li>
        )
      })
    }
  }

  render () {
    return (
      <div>
        {this.props.activeGroup ?
        <ul className="list-group col-sm-5">
          messages
          { this.renderList() }
          <div></div>
          <Link to='/groups/message/new' className="btn btn-primary">New Message</Link>
        </ul>
                                :
        ''}                        
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    messages: state.models.__MESSAGES,
    activeGroup: state.activeGroup
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getModel: getModel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);