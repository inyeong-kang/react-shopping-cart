import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '../public/assets/cart.svg';
import '../public/assets/logo.svg';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
