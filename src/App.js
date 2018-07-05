import React, { Component } from 'react';
import axios from 'axios';

import CalcButton from './components/CalcButton'
import CalcDisplay from './components/CalcDisplay'

const currency = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
const calcOperations = {
  '/': (prevNumber, nextNumber) => prevNumber / nextNumber,
  '*': (prevNumber, nextNumber) => prevNumber * nextNumber,
  '-': (prevNumber, nextNumber) => prevNumber - nextNumber,
  '+': (prevNumber, nextNumber) => prevNumber + nextNumber,
  '=': (prevNumber, nextNumber) => nextNumber
};

class App extends Component {
  constructor(props) {
    super(props);

    this.exangeUah = this.exangeUah.bind(this);
    this.exangeUsd = this.exangeUsd.bind(this);
  }

  state = {
    value: null,
    displayNum: "0",
    presenceOperand: false,
    operator: null,
    currencyBuy: '',
    exangeValueUsd: ''
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

  inputNumeric(number) {
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

  inputDot() {
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

  displayClear() {
    this.setState({
      displayNum: '0'
    })
  }

  clearLastChar() {
    const { displayNum } = this.state;

    let stringdisplayNum = String(displayNum);

    this.setState({
      displayNum: stringdisplayNum.substring(0, stringdisplayNum.length - 1) || '0'
    })
  }

  inputPercent() {
    const { displayNum } = this.state;
    const numericValue = parseFloat(displayNum);

    this.setState({
      displayNum: String(numericValue / 100)
    })
  }

  performOperation(nextOperator) {
    const { displayNum, operator, value } = this.state;

    const nextNumber = parseFloat(displayNum);

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

    this.setState({
      presenceOperand: true,
      operator: nextOperator
    })
  }

  exangeUsd = (event) => {
    const { currencyBuy } = this.state;

    let value = event.target.value;
    let exchangeAmount = value * currencyBuy;

    this.setState({
      exangeValueUsd: value,
      exangeValueUah: exchangeAmount.toFixed(2)
    })
  }

  exangeUah = (event) => {
    const { currencyBuy } = this.state;

    let value = event.target.value;
    let exchangeAmount = value / currencyBuy

    this.setState({
      exangeValueUah: value,
      exangeValueUsd: exchangeAmount.toFixed(2)
    })
  }

  render() {
    const { displayNum } = this.state;

    return (
      <div className="calculator">
        <CalcDisplay>{displayNum}</CalcDisplay>
        <div className="calculator__keypad keys">
          <div className="calculator__keys">
            <div className="keys_function">
              <CalcButton onClick={() => this.displayClear()}>AC</CalcButton>
              <CalcButton onClick={() => this.inputPercent()}>%</CalcButton>
              <CalcButton >$</CalcButton>
            </div>

            <div className="keys_number">
              <CalcButton onClick={() => this.inputNumeric(0)}>0</CalcButton>
              <CalcButton onClick={() => this.inputDot()}>.</CalcButton>
              <CalcButton >-></CalcButton>
              <CalcButton onClick={() => this.inputNumeric(1)}>1</CalcButton>
              <CalcButton onClick={() => this.inputNumeric(2)}>2</CalcButton>
              <CalcButton onClick={() => this.inputNumeric(3)}>3</CalcButton>
              <CalcButton onClick={() => this.inputNumeric(4)}>4</CalcButton>
              <CalcButton onClick={() => this.inputNumeric(5)}>5</CalcButton>
              <CalcButton onClick={() => this.inputNumeric(6)}>6</CalcButton>
              <CalcButton onClick={() => this.inputNumeric(7)}>7</CalcButton>
              <CalcButton onClick={() => this.inputNumeric(8)}>8</CalcButton>
              <CalcButton onClick={() => this.inputNumeric(9)}>9</CalcButton>
            </div>
          </div>

          <div className="keys_operator">
            <CalcButton onClick={() => this.performOperation('/')}>÷</CalcButton>
            <CalcButton onClick={() => this.performOperation('*')}>*</CalcButton>
            <CalcButton onClick={() => this.performOperation('-')}>-</CalcButton>
            <CalcButton onClick={() => this.performOperation('+')}>+</CalcButton>
            <CalcButton onClick={() => this.performOperation('=')}>=</CalcButton>
          </div>
        </div>
        <div className="calculator__exange exange">
          <label className="exange__label">
            USD
            <input type="number" className="exange__input" value={this.state.exangeValueUsd} onChange={this.exangeUsd} />
          </label>

          <label className="exange__label">
            UAH
            <input type="number" className="exange__input" value={this.state.exangeValueUah} onChange={this.exangeUah} />
          </label>
        </div>
      </div>

    );
  }
}
export default App;
