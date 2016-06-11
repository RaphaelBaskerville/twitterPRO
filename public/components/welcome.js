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
    console.log('saved token', window.localStorage.getItem('id_token'));
    console.log('queryStr: ', window.location.search.substr(1));
    console.log('location: ',window.location);
    console.log('isAUTH?', this.props.isAuthenticated);
    if(!this.props.isAuthenticated) {
      console.log('user is not authenticated');
      let token = window.location.search.substr(1) || window.localStorage.getItem('id_token');
      console.log('FINAL TOKEN: ', token);
      try {
        let user = jwtDecode(token)._doc;
        console.log("jwtdecode decoded: ", user);
        window.localStorage.setItem('id_token', token);
        window.localStorage.setItem('username', user.username);
        user.id_token = token;

        this.props.getTwitterObjForUserProfile(user.username)
          .then(function(data){
            console.log('users_profile', data);
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
        <div className="text-xs-right">
          <a href='/auth/twitter' className="btn btn-primary">Log In with Twitter</a>
        </div>
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




