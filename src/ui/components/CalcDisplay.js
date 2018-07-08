import React, { Component } from 'react';

class CalcDisplay extends Component {
  state = {
    scale: 1
  }

  componentDidUpdate() {
    const { scale } = this.state;

    const node = this.node;
    const parentNode = node.parentNode;
    const displayIndentWidth = 40; // for indent in scaling

    const availableWidth = parentNode.offsetWidth - displayIndentWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = availableWidth / actualWidth;

    if (scale === actualScale)
      return

    if (actualScale < 1) {
      this.setState({
        scale: actualScale
      })
    } else if (scale < 1) {
      this.setState({
        scale: 1
      })
    }

  }

  render() {
    const { scale } = this.state;
    return (
      <div className="calculator__display">
        <div
          className="calculator__value"
          style={{ transform: `scale(${scale},${scale})` }}
          ref={node => this.node = node} >
          {this.props.children} </div>
      </div>
    )
  }
}

export default CalcDisplay;