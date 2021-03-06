import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import SocketIOFileClient from 'socket.io-file-client';
import Crypt from 'g-crypt';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import filesReducer from './store/reducers/files';

const rootReducer = combineReducers({
    files: filesReducer
})

const store = createStore(rootReducer);

// Define encryption passphrase.
var passphrase = 'Qpud>CdkUbtu^yQ;!a>Ja`Zv?szt<22v';

// Define socket connection.
window.socket = io('https://zach.black:3001', {secure: true});
//window.socket = io('http://45.79.74.60:3001', {secure: true});

// Uploader.
window.uploader = new SocketIOFileClient(window.socket);

// Define crypter.
window.crypter = Crypt(passphrase);

// Wait for connection to server.
window.socket.on('connect', () => {
    console.log('Connected to server.');
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
