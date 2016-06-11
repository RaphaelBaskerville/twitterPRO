import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { postModel } from '../../actions/model';

class CreateGroup extends Component {
  // grab router method from context //DANGER//
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    let payload = {
      name: props.name,
      user: window.localStorage.getItem('username')
    };

    this.props.postModel('list', payload)
      .then(() => {
        this.context.router.push('/');
      })
  }

  render() {
    
    const { fields: {name}, handleSubmit } = this.props;
    console.log('\nCreateGroup user',this.props.fields);

    return (
      <div className='col-sm-8 red'>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3> Create a new group</h3>
        <div className={`form-group ${name.touched && name.invalid ? 'has-danger' : ''}`}>
          <label>New Group</label>
          <input type="text" className="form-control"  {...name} />
          <div className='text-help'>
          {name.touched ? name.error : ''}
          </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to='/groups' className='btn btn-danger'>Back</Link>
      </form>
      </div>
    );
  }
}

function validate(values) {
  const errors ={};

  if (!values.name) {
    errors.name = 'Enter a name for your group'
  }
  return errors;
};

export default reduxForm({
  form: 'GroupNewForm',
  fields: ['name'],
  validate
}, function(state){return {user:state.user}}, { postModel })(CreateGroup);