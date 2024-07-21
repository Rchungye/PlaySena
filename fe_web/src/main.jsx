import React from 'react';
import ReactDOM from 'react-dom/client';
import './Helpers/index.css';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './Routers/MainRouter.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  </React.StrictMode>
);
