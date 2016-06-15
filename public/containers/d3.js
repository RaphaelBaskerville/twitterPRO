import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import d3 from 'd3';
import fauxDom from 'react-faux-dom';

import { getModel } from '../actions/model';
import { addData } from '../actions/addData';

class d3svg extends Component {
  componentDidMount() {
    let user = window.localStorage.getItem('username');
    this.props.getModel('target', '/user/' + user)
  }

  render () {
   
    let fakediv = fauxDom.createElement('div');
    if (this.props.targets) {
    let width = 960;
    let height = 500;
    let data = this.props.targets.__TARGETS;
    let barWidth = width / data.length;

    let largestValue = getHighestValue(data);
    console.log(largestValue);
    let y = d3.scale.linear()
      .range([height, 0]);

      y.domain([0,getHighestValue(data)]);

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
        return y(d.numOfTweets);
      })
      .attr('width', barWidth - 1)
      .attr('height', function(d){
        return height - y(d.numOfTweets);
      })
      .attr('fill', 'rgba(20,60,100,0.4)')
    bar.append('text')
      .attr('x', barWidth / 2)
      .attr('y', function(d){
        return y(d.numOfTweets) + 5;
      })
      .attr('dy', ".75em")
      .attr('fill', 'rgba(255,255,255,0.89)')
      .text(function(d){
        return d.numOfTweets;
      });
      bar.append('text')
      .attr('x', 30)
      .attr('y', 450)
      .attr('dy', ".75em")
      .attr('fill', 'rgba(255,255,255,0.89)')
      .text(function(d){
        return "@" + d.handle;
      });
    }
           

            


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
function getHighestValue(array) {
  return Math.max.apply(null, array.map(function(el){
    return el.numOfTweets
  }))
}

function mapStateToProps(state){
  return {
    targets: state.models,
    data: state.data
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getModel, addData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(d3svg);
