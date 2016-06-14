import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { getTwitterObjForUserProfile } from '../actions/model';
import TargetList from '../containers/targets';
import loginActions from '../actions/login';
import {logout} from '../actions/logout';
import jwtDecode from 'jwt-decode';


import { PropTypes } from 'react';

class App extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    if(!this.props.isAuthenticated) {
      let token = window.location.search.substr(1) || window.localStorage.getItem('id_token');
      try {
        let user = jwtDecode(token)._doc;
        window.localStorage.setItem('id_token', token);
        window.localStorage.setItem('username', user.username);
        window.localStorage.setItem('user', JSON.stringify(user));
        user.id_token = token;

        this.props.getTwitterObjForUserProfile(user.username)
          .then(function(data){
            browserHistory.push('/groups');
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      browserHistory.push('/groups');
    }
  }

  
  logoutClick(e){
    e.stopPropagation();
    this.props.logout();
    browserHistory.push('/');
  }


  render () {
    let { activeUser } = this.props;
    return (
       <div>
        <div className="navbar navbar-default">
          <h1>
            TwiDerpRo
            { this.props.isAuthenticated  ?
              <button className="btn btn-danger pull-xs-right" onClick={ this.logoutClick.bind(this) }>Log out</button>
                                          :
              <a href='/auth/twitter' className="btn btn-primary pull-xs-right">Log In with Twitter</a>
            }
            { activeUser ? <img className="pull-xs-right" src={ activeUser.profile_image_url } /> : '' }
          </h1>
        </div>
        { this.props.children }
       </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.isAuthenticated,
    activeUser: state.user

  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ logout, getTwitterObjForUserProfile }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)