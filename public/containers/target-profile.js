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
    const { activeTarget } = this.props;
    console.log('TARGETPROFILE props:', activeTarget);
    return(
      <div className="target-profile">
      { activeTarget ? 
        <div>
          <h1>
            <img className="target-profile-img" src={activeTarget.profile_image_url} />
             {activeTarget.name}
          </h1>
          <div className="target-profile-status">Status: {activeTarget.status.text}</div> 
          {activeTarget.location ? <div className="target-profile-location">Location: {activeTarget.location}</div> : ''}
        </div>
          : this.props.params.id + 's profile goes here'
      }
        <Link to='/groups'>Back</Link>
      </div> 
    );
  }
}

function mapStateToProps(state) {
  return {activeTarget:state.activeTarget}
}

export default connect(mapStateToProps, { getTwitterObj })(TargetProfile);