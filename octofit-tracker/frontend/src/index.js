import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

const CODESPACE = process.env.REACT_APP_CODESPACE_NAME;
const API_BASE = CODESPACE
  ? `https://${CODESPACE}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

console.log('REACT_APP_CODESPACE_NAME=', CODESPACE);
console.log('Using API base URL:', API_BASE);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
