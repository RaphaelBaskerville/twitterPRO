import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

class CreateGroup extends Component {
  render() {
    
    const { fields: {name}, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} className='col-sm-8 red'>
        <h3> Create a new group</h3>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control"  {...name} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to='/groups' className='btn btn-primary'>Back</Link>
      </form>
    );
  }
}

export default reduxForm({
  form: 'GroupNewForm',
  fields: ['name']
})(CreateGroup)