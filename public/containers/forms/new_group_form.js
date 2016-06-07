import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createGroup } from '../../actions/model';


class CreateGroup extends Component {
  makeGroup(name){
    this.props.createGroup(name, this.props.user.username)
  }

  render() {
    
    const { fields: {name, user}, handleSubmit } = this.props;
    console.log('\nCreateGroup user',this.props.fields);

    return (
      <form onSubmit={handleSubmit(this.props.createGroup)} className='col-sm-8 red'>
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
}, function(state){return {user:state.user}}, { createGroup })(CreateGroup);