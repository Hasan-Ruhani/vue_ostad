import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './app/store.js';
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/custom.css";
import "./assets/plugins/datatables/datatables.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
