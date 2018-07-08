import React, { Component } from 'react';

class CalcExange extends Component {
  render() {
    const { exangeValueUsd, exangeValueUah, exangeUsd, exangeUah } = this.props;

    return (
      <div className="calculator__exange exange">
        <label className="exange__label">
          USD
        <input type="number" className="exange__input" value={exangeValueUsd} onChange={exangeUsd} />
        </label>

        <label className="exange__label">
          UAH
        <input type="number" className="exange__input" value={exangeValueUah} onChange={exangeUah} />
        </label>
      </div>
    )
  }
}

export default CalcExange;