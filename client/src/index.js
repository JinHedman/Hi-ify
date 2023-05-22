import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import 'animate.css';

import JoinView from './views/joinView';

import Room from './models/room';
import SyncModel from './models/firebaseModel';
import User from './models/user';
import './models/firebaseModel';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}

const sessionRoom = new Room();
const firebaseConnection_import = new SyncModel();
const this_user = new User();

ReactDOM.render(
    <App room={sessionRoom} firebase_connection={firebaseConnection_import} this_user={this_user}/>
,
  document.getElementById('root')
);



