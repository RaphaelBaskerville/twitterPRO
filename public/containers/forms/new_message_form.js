import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { postModel } from '../../actions/model';

class CreateMessage extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    let payload = {};
    payload.list = this.props.activeGroup.name;
    payload.text = props.text;

    this.props.postModel('message', payload)
      .then(() => {
        this.context.router.push('/groups');
      });
  }

  render() {
    
    const { fields: {text}, handleSubmit } = this.props;

    return (
      <div className='col-sm-8 red'>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3> Create a new message</h3>
        <div className={`form-group ${text.touched && text.invalid ? 'has-danger' : ''}`}>
          <input type="text" className="form-control"  {...text} />
          <div className='text-help'>
          {text.touched ? text.error : ''}
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

  if (!values.text) {
    errors.text = 'Enter a name for your group'
  }
  return errors;
};

export default reduxForm({
  form: 'TargetNewForm',
  fields: ['text'],
  validate
}, function(state){return {user:state.user, activeGroup:state.activeGroup}}, { postModel })(CreateMessage);




