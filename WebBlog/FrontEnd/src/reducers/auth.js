import isEmpty from 'lodash/isEmpty';
import { createSlice } from 'redux-starter-kit';
import update from '../helpers/update';
import axios from 'axios';
//import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {serverUrl} from '../config';
import BaseService from '../Services/Base/BaseService';

const initialState = {
  isAuthenticated: false,
  user: {
    id: '',
    name: '',
    image:'',
    roles: []
  }
};


export const userReducer = createSlice({
    slice: 'user',
    initialState: initialState,
    reducers: {
        setCurrentUser: (state,action) => {
            let newState = state;
            const user = action.payload;
            console.log("get user", user);
            newState = update.set(state, 'isAuthenticated', !isEmpty(user));
            newState = update.set(newState, 'user', user);
            return newState;
        }
    }
});

  export function logout() {
    console.log('--logout--');
    return dispatch => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('refreshToken');
        setAuthorizationToken(false);
        dispatch(userReducer.actions.setCurrentUser({}));
    };
}


export const login= async(data)=> {
    console.log('--login data--', data);
    return dispatch => {
        return axios.post(`${serverUrl}api/Account/login`, data)
        .then(res => {
          loginByJWT(res.data, dispatch);
        });
    }
}


export const facebook_enter= async(data) =>{
  return dispatch => {
    return axios.post(`${serverUrl}api/facebookauth/facebook`, data)
      .then(res => {
        loginByJWT(res.data, dispatch);
      });
  }
}


export const  google_enter= async(data)=> {
  return async dispatch => {
    return await axios.post(`${serverUrl}api/googleauth/google`, data)
      .then(res => {
        loginByJWT(res.data, dispatch);
      })
      .catch(err =>{
        console.log("Google error", err)
      });
  }
}


const loginByJWT = (tokens, dispatch) => {
  console.log('----loginByJWT----', tokens);
  const user = BaseService.SetTokensGetUser(tokens);
  dispatch(userReducer.actions.setCurrentUser(user));
} 

export let register= async(data) =>{
    console.log('--data--', data);
    return dispatch => {
        return axios.post(`${serverUrl}api/Account/Register`, data)
            .then(res => {
                //console.log("data register", res);
                loginByJWT(res.data, dispatch);
            });
    }
}

export function changePassword(data) {
    return dispatch => {
    return axios.post(`${serverUrl}api/Account/ChangePassword`, data);
    }
};

export function forgotPassword(data) {
    return dispatch => {
    return axios.post(`${serverUrl}api/Account/ForgotPassword`, data);
    }
};

export function resetPassword(data) {
  return dispatch => {
  return axios.post(`${serverUrl}api/Account/ResetPassword`, data);
  }
};