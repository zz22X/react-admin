import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.css';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App';
//{/* <BrowserRouter>
 // <Provider store={store}>
  //  <App />
 // </Provider>
//</BrowserRouter>, */}

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>,
document.getElementById('root'));


