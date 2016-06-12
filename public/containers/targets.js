import React, { Component }  from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getModel, getTwitterObj, deleteModel } from '../actions/model';

class TargetList extends Component {
  componentDidMount(){
    this.props.getModel('target', '/all/true');

  }
  onDeleteClick(target) {
    if (confirm('are you sure you want to delete ' + target.handle + '?')) {
      this.props.deleteModel('handle', target.handle, 'target')
        .then(() => {
          this.props.getModel('target', '/all/true');
        });
    }
  }


  renderList () {
    var groupTargets;
    if (this.props.activeGroup) {
      groupTargets = this.props.targets.filter((target) => { return target.list === this.props.activeGroup.name; });
      return groupTargets.map((target) => {
        let route = '/groups/profile/' + target.handle;
        return (
            <li
            className='list-group-item' 
            key={ target.handle }>
            <image className='target-image' src={target.imageUrl} />
            <Link to={ route }>
              { target.handle }
            </Link>
            <span
            className="pull-xs-right deletebtn" 
            onClick={ this.onDeleteClick.bind(this, target) }>
            del</span>
          </li>
        );    
      })
    }
  }

  render () {
    return (
      <div>
      {this.props.activeGroup ?
      <ul className="list-group col-sm-4">
      targets
      { this.renderList() }
      <div></div>
      <Link to='/groups/target/new' className="btn btn-primary">New Target</Link>
      </ul>
                             :
      ''}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    targets: state.models.__TARGETS,
    activeGroup: state.activeGroup
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getModel, getTwitterObj, deleteModel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetList);