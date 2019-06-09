import axios from "axios";
import { SET_USERS,DELETE_USER } from "./types";
//import jwt from 'jsonwebtoken';
//import setAuthorizationToken from '../utils/setAuthorizationToken';

export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}

export function getUsers() {
  return dispatch => {
    return axios.get("api/User/list").then(res => {
      console.log("LocalStorage Users: ", res.data);
      dispatch(setUsers(res.data));
    });
  };
}

export function getUserProfile(data) {
  return dispatch => {
    return axios.post("api/User/user",data);
  };
}

export function deleteUser(id) {
  return dispatch => {
      return axios.delete('api/User/' + id)
          .then(res => {
              var userId = res.data;
              console.log("User id: ", userId);
              dispatch({ type: DELETE_USER, userId });
          })
  }
}