import React, { Component }  from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getModel, deleteModel } from '../actions/model';

class MessagesList extends Component {
  componentDidMount(){
    this.props.getModel('hashtag', '/all/true', 'NEW_MODELS');
  }

   onDeleteClick(hashtag) {
    if (confirm('are you sure you want to delete ' + hashtag.text + '?')) {
      this.props.deleteModel('text', hashtag.text, 'hashtag')
        .then(() => {
          this.props.getModel('hashtag', '/all/true');
        });
    }
  }
  
  renderList () {
    var groupHashtags;
    if (this.props.activeGroup) {
      groupHashtags = this.props.hashtags.filter((hashtag) => { return hashtag.list === this.props.activeGroup.name; });
      return groupHashtags.map((hashtag) => {
        return (
          <li
          className='list-group-item' 
          key={ hashtag.text }> 
          { hashtag.text}
          <span
            className="pull-xs-right deletebtn" 
            onClick={ this.onDeleteClick.bind(this, hashtag) }>
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
        <div className="col-sm-3">
          hashtags
          <Link to='/groups/hashtag/new' className="new-link">new</Link> 
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
    hashtags: state.models.__HASHTAGS,
    activeGroup: state.activeGroup
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getModel, deleteModel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);