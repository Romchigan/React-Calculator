import React, { Component } from 'react';
import axios from 'axios';

import CalcFunctionKeys from './containers/CalcFunctionKeys';
import CalcNumberKeys from './containers/CalcNumberKeys';
import CalcOperatorKeys from './containers/CalcOperatorKeys';

import CalcDisplay from './components/CalcDisplay';
import CalcExange from './components/CalcExange';

const exchangeCurrency = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'

class App extends Component {
  state = {
    displayNum: "0",
    fullExpression: null,
    presenceOperand: false,
    operator: null,
    counted: false,
    currencyBuy: '',
    exangeValueUsd: '',
    exangeValueUah: ''
  }

  componentDidMount() {
    axios.get(exchangeCurrency)
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
    const { displayNum, counted } = this.state;

    if (counted) {
      this.setState({
        displayNum: String(number),
        fullExpression: null,
        counted: false,
        presenceOperand: false
      })
    } else {
      this.setState({
        displayNum: displayNum === '0' ? String(number) : displayNum + number,
        presenceOperand: false
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
      displayNum: "0",
      fullExpression: null,
      presenceOperand: false,
      operator: null,
      counted: false
    })
  }

  displayClearLast = () => {
    const { displayNum } = this.state;

    if (displayNum.length == 1) {
      this.setState({
        displayNum: "0"
      })
    } else {
      this.setState({
        displayNum: displayNum.slice(0, -1)
      })
    }
  }

  inputPercent = () => {
    const { displayNum } = this.state;
    const numericValue = parseFloat(displayNum);

    if (displayNum !== '0') {
      this.setState({
        displayNum: String(numericValue / 100),
        counted: true
      })
    }
  }

  performOperation = (nextOperator) => {
    const { displayNum, presenceOperand, fullExpression } = this.state;

    if (nextOperator === '=') {
      const calculatedNumber = parseFloat(eval(displayNum).toFixed(10));

      this.setState({
        displayNum: calculatedNumber,
        fullExpression: displayNum + ' =',
        counted: true,
        presenceOperand: false
      })

      if (isNaN(calculatedNumber)) {
        this.setState({
          displayNum: "error"
        })
      } else if (calculatedNumber === Infinity) {
        this.setState({
          displayNum: 'Infinity'
        })
      }

    } else {
      if (!presenceOperand) {
        this.setState({
          displayNum: displayNum + nextOperator,
          counted: false,
          presenceOperand: true
        })

      } else {
        this.setState({
          displayNum: displayNum.slice(0, -1) + nextOperator,
          counted: false,
          presenceOperand: true
        })
      }
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
    const { displayNum, fullExpression, counted, exangeValueUsd, exangeValueUah } = this.state;

    return (
      <div className="calculator-container">
        <div className="calculator">
          <CalcDisplay fullExpression={fullExpression}>{displayNum}</CalcDisplay>

          <div className="calculator__keypad keys">
            <div className="calculator__keys">
              <CalcFunctionKeys displayClear={counted ? this.displayClear : this.displayClearLast} inputPercent={this.inputPercent} counted={counted} />
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
