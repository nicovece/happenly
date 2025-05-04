import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import * as atatus from 'atatus-spa';
atatus.config('2a57695fcbdb439089e1f7e59f12b0a4').install();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
