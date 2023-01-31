import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Calendar from './components/Layout/Calendar/Calendar';
import 'bulma/css/bulma.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Calendar />
    </BrowserRouter>
  </React.StrictMode>
);
