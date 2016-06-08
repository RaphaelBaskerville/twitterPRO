import React, { Component }  from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getModel } from '../actions/model';

class MessagesList extends Component {
  componentDidMount(){
    this.props.getModel('hashtag', '/all/true', 'NEW_MODELS');
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
          </li>
        )
      })
    }
  }

  render () {
    return (
      <div>
        {this.props.activeGroup ?
        <ul className="list-group col-sm-3">
          hashtags
          { this.renderList() }
          <div></div>
          <Link to='/groups/hashtag/new' className="btn btn-primary">New hashtag</Link> 
        </ul>
                                  :
        ''}
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log('HashtagList state:\n', state)
  return {
    hashtags: state.models.hashtag,
    activeGroup: state.activeGroup
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getModel: getModel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);