import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import auth from "../reducers/auth";
import user from "../reducers/user";
import { hotel as hotelSlice } from "../components/hotel/hotelReducer";
import { captchaReducer } from "../components/captcha/reducer";

export default function configureStore (history, initialState) {
  const reducers = {
    auth,
      userlist: user,
      hotel: hotelSlice.reducer,
      captcha: captchaReducer,
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
