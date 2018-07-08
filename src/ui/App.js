import React, { Component } from 'react';
import axios from 'axios';

import CalcFunctionKeys from './containers/CalcFunctionKeys';
import CalcNumberKeys from './containers/CalcNumberKeys';
import CalcOperatorKeys from './containers/CalcOperatorKeys';

import CalcDisplay from './components/CalcDisplay';
import CalcExange from './components/CalcExange';

const currency = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
const calcOperations = {
  '/': (prevNumber, nextNumber) => prevNumber / nextNumber,
  '*': (prevNumber, nextNumber) => prevNumber * nextNumber,
  '-': (prevNumber, nextNumber) => prevNumber - nextNumber,
  '+': (prevNumber, nextNumber) => prevNumber + nextNumber,
  '=': (prevNumber, nextNumber) => nextNumber
};

class App extends Component {
  state = {
    value: null,
    displayNum: "0",
    presenceOperand: false,
    operator: null,
    currencyBuy: '',
    exangeValueUsd: '',
    exangeValueUah: ''
  }

  componentDidMount() {
    axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      .then(res => {
        const cours = res.data;

        this.setState({
          currencyBuy: cours[0].buy,
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  inputNumeric = (number) => {
    const { displayNum, presenceOperand } = this.state;

    if (presenceOperand) {
      this.setState({
        displayNum: String(number),
        presenceOperand: false
      })
    } else {
      this.setState({
        displayNum: displayNum === '0' ? String(number) : displayNum + number
      })
    }
  }

  inputDot = () => {
    const { displayNum, presenceOperand } = this.state;

    if (presenceOperand) {
      this.setState({
        displayNum: '.',
        presenceOperand: false
      })
    } else if (displayNum.indexOf('.') === -1) {
      this.setState({
        displayNum: displayNum + '.',
        presenceOperand: false
      })
    }
  }

  displayClear = () => {
    this.setState({
      value: null,
      displayNum: "0",
      presenceOperand: false,
      operator: null
    })
  }

  inputPercent = () => {
    const { displayNum } = this.state;
    const numericValue = parseFloat(displayNum);

    this.setState({
      displayNum: String(numericValue / 100)
    })
  }

  performOperation = (nextOperator) => {
    const { displayNum, operator, value } = this.state;

    const nextNumber = parseFloat(displayNum);

    this.setState({
      presenceOperand: true,
      operator: nextOperator
    })

    if (value == null) {
      this.setState({
        value: nextNumber
      })
    } else if (operator) {
      const prevNumber = value || 0;
      const calculatedNumber = calcOperations[operator](prevNumber, nextNumber);

      this.setState({
        value: calculatedNumber,
        displayNum: calculatedNumber
      })
    }

    if (operator == '/' && nextNumber == '0') {
      this.setState({
        displayNum: "Please don't divide by zero."
      })
    }

    if (operator == nextOperator) {
      console.log('simple operator');

    }
  }

  exangeUsd = (event) => {
    const { currencyBuy } = this.state;

    let value = event.target.value;
    let exchangeAmount = value * currencyBuy;

    if (value === '') {
      this.setState({
        exangeValueUsd: '',
        exangeValueUah: ''
      })
    } else {
      this.setState({
        exangeValueUsd: value,
        exangeValueUah: exchangeAmount.toFixed(2)
      })
    }
  }

  exangeUah = (event) => {
    const { currencyBuy } = this.state;

    let value = event.target.value;
    let exchangeAmount = value / currencyBuy

    if (value === '') {
      this.setState({
        exangeValueUah: '',
        exangeValueUsd: ''
      })
    } else {
      this.setState({
        exangeValueUah: value,
        exangeValueUsd: exchangeAmount.toFixed(2)
      })
    }
  }

  render() {
    const { displayNum, exangeValueUsd, exangeValueUah, exangeUah } = this.state;

    return (
      <div className="calculator-container">
        <div className="calculator">
          <CalcDisplay>{displayNum}</CalcDisplay>

          <div className="calculator__keypad keys">
            <div className="calculator__keys">
              <CalcFunctionKeys displayClear={this.displayClear} inputPercent={this.inputPercent} />
              <CalcNumberKeys inputNumeric={this.inputNumeric} inputDot={this.inputDot} />
            </div>
            <CalcOperatorKeys performOperation={this.performOperation} />
          </div>
        </div>

        <CalcExange
          exangeValueUsd={exangeValueUsd}
          exangeValueUah={exangeValueUah}
          exangeUsd={this.exangeUsd}
          exangeUah={this.exangeUah}
        />
      </div>
    );
  }
}
export default App;
