import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss'

import App from './ui/App';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <App />
);

module.hot.accept();