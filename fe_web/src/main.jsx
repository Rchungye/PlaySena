import React from 'react';
import ReactDOM from 'react-dom/client';
import './Helpers/index.css';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './Routers/MainRouter.jsx';
import { UserProvider } from './store/UserContext'; // Importa el UserProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> {/* Envuelve tu aplicación con UserProvider */}
        <MainRouter />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
