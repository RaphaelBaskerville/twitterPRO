import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { getModel } from '../actions/model';
import { bindActionCreators } from 'redux';

class TargetList extends Component {
  renderList () {
    console.log('Props in TargetList', this.props);
    var groupTargets = this.props.targets.filter((target) => { return target.list === this.props.activeGroup } );
    console.log('group targets', groupTargets);
    return groupTargets.map((target) => {
      console.log('target', target);
      return (
        <li
        className='list-group-item' 
        key={ target.handle }
      > { target.handle } </li>
      )
    })
  }

  render () {
    return (
      <ul className="list-group col-sm-4"
      onClick={ () => this.props.getModel('target', '/all/true', 'NEW_MODELS') }
      >
      targetList
      { this.renderList() }
      </ul>
    )
  }
}

function mapStateToProps (state) {
  console.log('state in TargetList\n', state)
  return {
    targets: state.models.target
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getModel: getModel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetList);