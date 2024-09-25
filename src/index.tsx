import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/home';
import { CartProvider } from './context/CartContext';
import './styles/global.scss'



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
    
  </React.StrictMode>
);


