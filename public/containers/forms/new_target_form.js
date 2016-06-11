import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { postModel, getTwitterObj } from '../../actions/model';

class CreateTarget extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    let payload = {
      handle:props.handle,
      list:this.props.activeGroup.name,
      interval:'*/1 * * * *',
    };
    this.props.getTwitterObj(props.handle)
      .then((twitterdata) => {
        console.log('twitterData', twitterdata.payload.data.profile_image_url);
        payload.imageUrl = twitterdata.payload.data.profile_image_url;
        return this.props.postModel('target', payload);
      })
      .then((data) => {
        console.log('new target saved', data);
        this.context.router.push('/groups');
    });
    console.log('onsubmit called with props: ', props);
  }

  render() {
    
    const { fields: {handle}, handleSubmit } = this.props;
    console.log('\nCreateTarget props',this.props);

    return (
      <div className='col-sm-8 red'>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3> Create a new target</h3>
        <div className={`form-group ${handle.touched && handle.invalid ? 'has-danger' : ''}`}>
          <label>New Target</label>
          <input type="text" className="form-control"  {...handle} />
          <div classname='text-help'>
          {handle.touched ? handle.error : ''}
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

  if (!values.handle) {
    errors.handle = 'Enter a name for your group'
  }
  return errors;
};

export default reduxForm({
  form: 'TargetNewForm',
  fields: ['handle'],
  validate
}, function(state){return {user:state.user, activeGroup:state.activeGroup}}, { postModel, getTwitterObj })(CreateTarget);