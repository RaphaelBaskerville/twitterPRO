import React, { Component }  from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getModel, deleteModel } from '../actions/model';

class MessagesList extends Component {
  componentDidMount(){
    this.props.getModel('message', '/all/true', 'NEW_MODELS');
  }
  onDeleteClick(message) {
    if (confirm('are you sure you want to delete ' + message.text + '?')) {
      this.props.deleteModel('text', message.text, 'message')
        .then(() => {
          this.props.getModel('message', '/all/true');
        });
    }
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
          <span
            className="pull-xs-right deletebtn" 
            onClick={ this.onDeleteClick.bind(this, message) }>
            del</span>
          </li>
        )
      })
    }
  }

  render () {
    return (
      <div>
        {this.props.activeGroup ?
        <div className="col-sm-5">
          messages
          <Link to='/groups/message/new' className="new-link">new</Link>
          <ul className="list-group model-list-container">
            { this.renderList() }
            <div></div>
          </ul>
        </div>
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
  return bindActionCreators({ getModel, deleteModel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);