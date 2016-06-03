import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class CreateGroup extends Component {
  render() {
    return (
      <div>create group
          <Link to='/groups' className='btn btn-primary'>
            home
          </Link>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {anything:'anything'};
} 
function mapDispatchToProps (dispatch) {
  return bindActionCreators({anything:"anything"}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);