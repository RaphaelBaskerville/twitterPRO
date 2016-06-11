import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import {browserHistory} from 'react-router';
import {getTwitterObjForUserProfile} from '../actions/model';
import { receiveLogin } from '../actions/login';
import axios from 'axios';



class Welcome extends Component {

  componentDidMount() {
    console.log('WELCOME will mount\n------------------');
    if(!this.props.isAuthenticated) {
      console.log('user is not authenticated');
      let token = window.location.search.substr(1) || window.localStorage.getItem('id_token');
      try {
        let user = jwtDecode(token)._doc;
        window.localStorage.setItem('id_token', token);
        window.localStorage.setItem('username', user.username);
        user.id_token = token;

        this.props.getTwitterObjForUserProfile(user.username)
          .then(function(data){
            browserHistory.push('/groups');
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('\n\nuser is authenticated already\n\n');
      browserHistory.push('/groups');
    }
  }


  render () {
    return (
      <div>
        <h1>Welcome!</h1>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    currentUser: state.currentUser,
    isAuthenticated:state.isAuthenticated
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getTwitterObjForUserProfile, receiveLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);




