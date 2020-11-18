// app/javascript/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Routes from './Routes';
import LayoutDefault from './layouts/LayoutDefault'
import I18nProvider from './i18n/I18nProvider'
import './App.scss';
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from "redux-persist/integration/react";
import store from './store';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const persistor = persistStore(store);

class App extends React.Component {
  render() {
    return (
      
        <Provider store={ store } loading={null}>
          <PersistGate persistor={persistor}>
            <I18nProvider>
              <Router>
                <LayoutDefault>
                  <Routes />
                </LayoutDefault>
              </Router>
            </I18nProvider>
          </PersistGate>
        </Provider>
    );
  }
}

export default App;
