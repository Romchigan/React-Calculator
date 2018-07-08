import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss'

import App from './ui/App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();