import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ProductsProvider>
    <FilterProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FilterProvider>
  </ProductsProvider>
);
