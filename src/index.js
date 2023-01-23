import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Calendar from './components/Layout/Calendar/Calendar';
import 'bulma/css/bulma.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calendar />
  </React.StrictMode>
);
