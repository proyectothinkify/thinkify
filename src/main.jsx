
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store";

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppTheme } from "./theme/AppTheme.jsx";
import 'animate.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store={store}>
      <AppTheme>
          <HashRouter>
            <App />
          </HashRouter>
        </AppTheme>
    </Provider>

   
    
  </React.StrictMode>,
)
