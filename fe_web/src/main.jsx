import React from 'react';
import ReactDOM from 'react-dom/client';
import './Helpers/index.css';
import './Helpers/styles.css';
import { BrowserRouter } from "react-router-dom";
import AuthNavegator from './Routers/AuthNavegator.jsx';
import GameNavagator from './Routers/GameNavagator.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthNavegator />
      <GameNavagator />
    </BrowserRouter>,
  </React.StrictMode>,
);
