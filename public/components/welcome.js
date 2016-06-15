import React, { Component } from 'react';
import { Link } from "react-router";

export default class Welcome extends Component {
  render () {
    return (
      <div className="row">
        <div className="centered">Welcome! Please LogIn with Twitter to continue</div>
      </div>
    );
  }
}
        // removing links until needed
        // <Link to="/d3" className="btn btn-primary"> d3 </Link>
        // <Link to="/groups" className="btn btn-primary"> Groups </Link>






