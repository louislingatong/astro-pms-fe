import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Routes from './app/routes';
import {authCheck} from './app/store/authSlice';

store.dispatch(authCheck());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
