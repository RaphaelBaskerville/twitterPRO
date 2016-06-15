import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import d3 from 'd3';
import fauxDom from 'react-faux-dom';

import { getModel } from '../actions/model';
import { addData } from '../actions/addData';

class d3svg extends Component {
  componentDidMount() {
      d3.select('svg')
      .transition()
      .duration(1000)
      .style('background-color', 'rgba(0,0,0,0.1)')
    
  }

  shouldComponentUpdate(props) {
    console.log('props', props);
     return true;
  }


  render () {


    let width = 960;
    let height = 500;
    let data = this.props.data;
    let barWidth = width / data.length;
    let fakediv = fauxDom.createElement('div');

    let y = d3.scale.linear()
      .range([height, 0]);
      y.domain([0,50]);

    let svg = d3.select(fakediv).append('svg')
      .attr('width', width)
      .attr('height', height)

    let bar = svg.selectAll('g')
        .data(data)
        .enter().append('g')
          .attr('transform', function(d,i){
            return "translate(" + i * barWidth + ",0)";
          });
    bar.append("rect")
      .attr('y', function(d) {
        console.log(d)
        console.log(y(d));
        return y(d);
      })
      .attr('width', barWidth - 1)
      .attr('height', function(d){
        console.log('height', height - y(d));
        return height - y(d);
      })
      .attr('fill', 'rgba(20,60,100,0.4)')
           

            


    return (
      <div>
        <div>
          <submit onClick={this.props.addData.bind(this)} className='btn btn-primary' >submit</submit>
        </div>
        {fakediv.toReact()}
      </div>
    );
  }
}

let options = {
  size: 5,
  'cx': 150,
  'cy': 75,
  'fill': 'purple'
}


function mapStateToProps(state){
  return {
    models: state.models,
    data: state.data
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getModel, addData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(d3svg);
