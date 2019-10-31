import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, {history} from './store/configureStore';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import {userReducer} from './reducers/auth';
import * as loginActions from './views/Pages/Login/reducer';
window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

// if(localStorage.jwtToken) {
//     let token=localStorage.jwtToken;
//     let user=jwt.decode(token);
//     setAuthorizationToken(token);
//     store.dispatch(userReducer.actions.setCurrentUser(user));
//   }

if(localStorage.jwtToken) {
    let data = {token: localStorage.jwtToken, refToken: localStorage.refreshToken};
    loginActions.loginByJWT(data, store.dispatch);
}


const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
