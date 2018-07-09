import React, { Component } from 'react';
import PropTypes from "prop-types";
import CalcButton from '../components/CalcButton';

class CalcOperatorKeys extends Component {
  render() {
    const { performOperation } = this.props;

    return (
      <div className="keys_operator" >
        <CalcButton onClick={() => performOperation('/')}>/</CalcButton>
        <CalcButton onClick={() => performOperation('*')}>*</CalcButton>
        <CalcButton onClick={() => performOperation('-')}>-</CalcButton>
        <CalcButton onClick={() => performOperation('+')}>+</CalcButton>
        <CalcButton onClick={() => performOperation('=')}>=</CalcButton>
      </div>
    )
  }
}

CalcOperatorKeys.propTypes = {
  performOperation: PropTypes.func,
};

export default CalcOperatorKeys;