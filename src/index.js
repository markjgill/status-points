import React from 'react';
import ReactDOM from 'react-dom';

import "primereact/resources/themes/mdc-light-deeppurple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../node_modules/primeflex/primeflex.css";

import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);