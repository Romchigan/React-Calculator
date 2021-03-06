import React, { Component } from 'react';
import PropTypes from "prop-types";
import CalcButton from '../components/CalcButton';

class CalcNumberKeys extends Component {
  render() {
    const { inputNumeric, inputDot, isHistory } = this.props;

    return (
      <div className="keys_number" >
        <CalcButton onClick={() => inputNumeric(0)}>0</CalcButton>
        <CalcButton onClick={() => inputDot()}>.</CalcButton>
        <CalcButton onClick={() => isHistory()}>history</CalcButton>
        <CalcButton onClick={() => inputNumeric(1)}>1</CalcButton>
        <CalcButton onClick={() => inputNumeric(2)}>2</CalcButton>
        <CalcButton onClick={() => inputNumeric(3)}>3</CalcButton>
        <CalcButton onClick={() => inputNumeric(4)}>4</CalcButton>
        <CalcButton onClick={() => inputNumeric(5)}>5</CalcButton>
        <CalcButton onClick={() => inputNumeric(6)}>6</CalcButton>
        <CalcButton onClick={() => inputNumeric(7)}>7</CalcButton>
        <CalcButton onClick={() => inputNumeric(8)}>8</CalcButton>
        <CalcButton onClick={() => inputNumeric(9)}>9</CalcButton>
      </div>
    )
  }
}

CalcNumberKeys.propTypes = {
  inputNumeric: PropTypes.func,
  inputDot: PropTypes.func,
};

export default CalcNumberKeys;