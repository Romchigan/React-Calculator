import React, { Component } from 'react';
import PropTypes from "prop-types";

class CalcHistory extends Component {
  render() {
    const { isHistory, clearHistory } = this.props;
    const historyList = sessionStorage.getItem("history");
    const historyListParse = JSON.parse(historyList);

    let historyListItems;

    if (historyList) {
      historyListItems = historyListParse.map((item, index) => 
        <li className="history__item" key={index}>{item.elemHistory}</li>
      )
    }
   
    return (
      <div className="history calculator__history">
        
        <div className="history__btns">
          <span className="history__close" onClick={isHistory}>+</span>
          <span className="history__clear" onClick={clearHistory}>clear</span>
        </div>
        {
          historyList ? 
          (
            <ul className="history__list"> { historyListItems } </ul>
          ) : null
        }
       
      </div>
    )
  }
}

CalcHistory.propTypes = {
  isHistory: PropTypes.func
};

export default CalcHistory;