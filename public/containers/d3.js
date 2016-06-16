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
    d3.select('svg')
      .transition()
      .delay(1000)
      .duration(1000)
      .style('background-color', '')
  }

  render () {
    let fakediv = fauxDom.createElement('div');
    if (this.props.targets) {
      let width = 960;
      let height = 250;
      let data = this.props.targets.__TARGETS;
      let barWidth = width / data.length;

      let y = d3.scale.linear()
        .range([height, 0]);
        y.domain([0,getHighestValue(data)]);

      let svg = d3.select(fakediv).append('svg')
        .attr('width', width)
        .attr('height', height);

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
        .attr('fill', '#0275d8');

      bar.append('text')
        .attr('x', barWidth / 2)
        .attr('y', function(d){
          return y(d.numOfTweets) + 10;
        })
        .attr('fill', 'rgba(255,255,255,0.89)')
        .text(function(d){
          return d.numOfTweets;
        });
        bar.append('text')
        .attr('x', 5)
        .attr('y', 245)
        .attr('fill', 'rgba(255,255,255,0.89)')
        .text(function(d){
          return "@" + d.handle;
        });
    }
    return (
        <div>
          {fakediv.toReact()}
          <p className="centered">Number of tweets sent by twiDerp</p>
        </div>
    );
  }
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
