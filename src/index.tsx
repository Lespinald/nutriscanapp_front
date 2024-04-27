import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // No se necesita la extensión .tsx
import "./assets/styles.css";
import { Provider } from 'react-redux';
import { store } from './redux/store'; // No se necesita la extensión .ts

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);