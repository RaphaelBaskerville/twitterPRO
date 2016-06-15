import React, { Component } from 'react';
import { Link } from "react-router";

export default class Welcome extends Component {
  render () {
    return (
      <div className="row">
        <div className="centered">Welcome! Please LogIn with Twitter to continue</div>
        <Link to="/groups" className="btn btn-primary"> Groups </Link>
      </div>
    );
  }
}
        // removing d3 link till its good
        // <Link to="/d3" className="btn btn-primary"> d3 </Link>






