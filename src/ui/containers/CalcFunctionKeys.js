import React, { Component } from 'react';
import PropTypes from "prop-types";
import CalcButton from '../components/CalcButton';

class CalcFunctionKeys extends Component {
  render() {
    const { displayClear, inputPercent, counted } = this.props;
    const clearExpression = counted ? 'AC' : 'C';

    return (
      <div className="keys_function" >
        <CalcButton onClick={displayClear}>{clearExpression}</CalcButton>
        <CalcButton onClick={inputPercent}>%</CalcButton>
        <CalcButton >$</CalcButton>
      </div>
    )
  }
}

CalcFunctionKeys.propTypes = {
  displayClear: PropTypes.func,
  inputPercent: PropTypes.func,
  counted: PropTypes.bool,
};

export default CalcFunctionKeys;