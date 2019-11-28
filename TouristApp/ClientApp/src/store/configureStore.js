import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { captchaReducer } from "../components/captcha/reducer";
import { tours } from "../reducers/tourReducer";
import { filters } from "../reducers/filterReducer";
import { countries } from "../reducers/countryReducer";
import * as RefreshToken from '../components/RefreshToken/reducer';

//import {userReducer} from '../reducers/auth';
import user from '../reducers/user';

import refreshTokenMiddleware from './middleware/refreshTokenMiddleware'
import {weatherReducer} from '../components/weather/reducers'
import {mapReducer} from '../components/map/reducers'
import { loginReducer } from "../views/Pages/Login/reducer";
import { registerReducer } from "../views/Pages/Register/reducer";
import {kursReducer} from "../components/admin/ConverterPrivatBank/reducer"
import { connectRouter, routerMiddleware } from 'connected-react-router';
//import { createBrowserHistory } from 'history';
//import createHistory from 'history/createHashHistory';
import * as createHistory from "history";

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createHistory.createHashHistory({ basename: baseUrl });
//export const history = createHistory({ basename: baseUrl });

export default function configureStore (history, initialState) {
    const reducers = {
      captcha: captchaReducer,
      login: loginReducer,      
      userlist: user,
      tours:tours.reducer,
      filters:filters.reducer,
      countries:countries.reducer,
      refreshToken: RefreshToken.refreshReducer,
      weather:weatherReducer,
      map:mapReducer,
      register:registerReducer,
      kurs:kursReducer
    };

    const middleware = [
      refreshTokenMiddleware(),
      thunk,
      routerMiddleware(history)
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
      enhancers.push(window.devToolsExtension());
    }

    const rootReducer = combineReducers({
      ...reducers,
      router: connectRouter(history)
    });

    return createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware), ...enhancers)
    );
  }