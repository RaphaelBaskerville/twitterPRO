import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import { getTwitterObj } from '../actions/model';


class TargetProfile extends Component {
  componentWillMount(){
    this.props.getTwitterObj(this.props.params.id);
  }
  render() {
  console.log('TARGETPROFILE props:', this.props)
    return(
      <div>
      { this.props.activeTarget ? 
        <div>
          <img src={this.props.activeTarget.profile_image_url} />
          <h3>Name: {this.props.activeTarget.name}</h3>
          <div>Location: {this.props.activeTarget.location}</div> 
          <div>status: {this.props.activeTarget.status.text}</div> 
        </div>
          : this.props.params.id + 's profile goes here'
      }

        <Link to='/groups' className='btn btn-danger'>Back</Link>
      </div> 
    );
  }
}

function mapStateToProps(state) {
  return {activeTarget:state.activeTarget}
}

export default connect(mapStateToProps, { getTwitterObj })(TargetProfile);