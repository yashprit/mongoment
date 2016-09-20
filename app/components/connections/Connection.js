import React, { Component, PropTypes } from 'react';

export default class Connetions extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  };

  render() {
    return (<div>connections</div>);
  }
}