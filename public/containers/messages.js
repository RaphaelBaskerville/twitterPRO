import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { getModel } from '../actions/model';
import { bindActionCreators } from 'redux';

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
      <ul 
      className="list-group col-sm-5">
      messages
      { this.renderList() }
      </ul>
    )
  }
}

function mapStateToProps (state) {
  console.log('state in MessageList\n', state)
  return {
    messages: state.models.message,
    activeGroup: state.activeGroup
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getModel: getModel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);