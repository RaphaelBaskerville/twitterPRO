import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createModel } from '../../actions/model';

class CreateHashtag extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    console.log('onsubmit called with props: ', props);
    let payload = {};
    payload.list = this.props.activeGroup.name;
    payload.text = props.text;

    this.props.createModel(props, payload, 'hashtag')
      .then(() => {
        this.context.router.push('/groups');
      });
  }

  render() {
    
    const { fields: {text}, handleSubmit } = this.props;
    console.log('\nCreateHashtag props',this.props);

    return (
      <div className='col-sm-8 red'>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3> Create a new hashtag</h3>
        <div className={`form-group ${text.touched && text.invalid ? 'has-danger' : ''}`}>
          <label>New Hashtag</label>
          <input type="text" className="form-control"  {...text} />
          <div classname='text-help'>
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
}, function(state){return {user:state.user, activeGroup:state.activeGroup}}, { createModel })(CreateHashtag);




