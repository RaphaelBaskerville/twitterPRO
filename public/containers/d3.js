import React, { Component } from 'react';
import d3 from 'd3';
import fauxDom from 'react-faux-dom';

export default class d3svg extends Component {
  componentDidMount() {
    
  }

  shouldComponentUpdate() {
    // return false;
  }

  render () {
    let fakediv = fauxDom.createElement('div');
    let svg = d3.select(fakediv).append("svg")
      .style('background-color', 'grey')
      .append('circle')
        .attr('r', 15)
        .attr('cx', 100)
        .attr('cy', 100)
        .attr('fill', 'purple')


    return (
      <div>
        {fakediv.toReact()}
      </div>
    );
  }
}







