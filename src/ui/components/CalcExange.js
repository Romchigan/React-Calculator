import React, { Component } from 'react';
import PropTypes from "prop-types";

class CalcExange extends Component {
  render() {
    const { exangeValueUsd, exangeValueUah, exangeUsd, exangeUah } = this.props;
    const valid = /[0-9]/;
    const input = document.getElementsByName('exange__input');

    return (
      <div className="calculator__exange exange">
        <label className="exange__label">
          USD
        <input type="number" name="exange__input" className="exange__input" value={exangeValueUsd} onChange={exangeUsd} />
        </label>

        <label className="exange__label">
          UAH
        <input type="number" className="exange__input" value={exangeValueUah} onChange={exangeUah} />
        </label>
      </div>
    )
  }
}

CalcExange.propTypes = {
  exangeValueUsd: PropTypes.string,
  exangeValueUah: PropTypes.string,
  exangeUsd: PropTypes.func,
  exangeUah: PropTypes.func,
};

export default CalcExange;