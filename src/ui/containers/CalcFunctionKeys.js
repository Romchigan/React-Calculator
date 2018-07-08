import React, { Component } from 'react';
import PropTypes from "prop-types";
import CalcButton from '../components/CalcButton';

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

CalcFunctionKeys.propTypes = {
  displayClear: PropTypes.func,
  inputPercent: PropTypes.func,
};

export default CalcFunctionKeys;