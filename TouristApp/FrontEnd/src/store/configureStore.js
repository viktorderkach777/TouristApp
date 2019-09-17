import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { captchaReducer } from "../components/captcha/reducer";
import { tours } from "../components/tours/tourReducer";
import * as RefreshToken from '../components/RefreshToken/reducer';

import {userReducer} from '../reducers/auth';
import user from '../reducers/user';
import refreshTokenMiddleware from './middleware/refreshTokenMiddleware'
import {weatherReducer} from '../components/weather/reducers'
import {mapReducer} from '../components/map/reducers'

export default function configureStore (history, initialState) {
    const reducers = {
      captcha: captchaReducer,
      auth:userReducer.reducer,
      userlist: user,
      tours:tours.reducer,
      refreshToken: RefreshToken.refreshReducer,
      weather:weatherReducer,
      map:mapReducer
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
      routing: routerReducer
    });

    return createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware), ...enhancers)
    );
  }