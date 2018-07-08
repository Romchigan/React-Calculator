import React, { Component } from 'react';

class CalcButton extends Component {
  render() {
    const { ...props } = this.props;

    return (
      <button className="calculator__key" {...props} > {this.props.children} </button>
    )
  }
}

export default CalcButton;