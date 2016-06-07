import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import {browserHistory} from 'react-router';
import {receiveLogin} from '../actions/login';



class Welcome extends Component {

   componentWillMount() {
    console.log('WELCOME will mount\n------------------');
    console.log('TOKEN: ',window.localStorage.token);
    console.log('location: ',window.location);
    console.log('context', this);
    
      try {
        let token = window.location.search.substr(1);
        let user = jwtDecode(token)._doc;
        console.log("user",user);
        window.localStorage.token = token;
        window.localStorage.user = user;
        user.id_token = token;
        if (user) {
          receiveLogin(user);
          browserHistory.push('/groups');
        }
      } catch(err) {
        console.log('user not logged in', err);
      }
    
  }

  logout(){
    window.localStorage.token='';
    fetch('/logout').then(function(){
      console.log('loggedout user\n', window.localStorage.token);
    });
  }

  render () {
    return (
      <div>
        <h1>Welcome!</h1>
        <div className="text-xs-right">
          <a href='/auth/twitter' className="btn btn-primary">Log In with Twitter</a>
          <div to="/groups" className="btn btn-primary" onClick={this.logout}>
            Log out
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    currentUser: state.currentUser
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({ receiveLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);




