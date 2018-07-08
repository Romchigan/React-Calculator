import React, { Component } from 'react';
import CalcButton from '../components/CalcButton'

class CalcFunctionKeys extends Component {
  render() {
    const { displayClear, inputPercent } = this.props;

    return (
      <div className="keys_function" >
        <CalcButton onClick={displayClear}>AC</CalcButton>
        <CalcButton onClick={inputPercent}>%</CalcButton>
        <CalcButton >$</CalcButton>
      </div>
    )
  }
}

export default CalcFunctionKeys;