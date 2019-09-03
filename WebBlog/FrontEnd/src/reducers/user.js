import axios from "axios";
import {serverUrl} from '../config';

export const SET_USERS = "SET_USERS";
export const DELETE_USER = 'DELETE_USER';

const initialState = {
    list: []
};

export default function users(state = initialState, action = {}) {
    let newState = state;
    switch (action.type) {
        case SET_USERS:
            newState = {
                ...state,
                list: action.users
            };
            break;
        case DELETE_USER:
            newState = {
                ...state,
                list: state.list.filter(item => item.id !== action.userId)
            };
            break;
        default:
            return state;
    }
    return newState;
}


export function setUsers(users) {
    return {
        type: SET_USERS,
        users
    };
}

export function getUsers() {
    return dispatch => {
        return axios.get(`${serverUrl}api/User/list`).then(res => {
            console.log("LocalStorage Users: ", res.data);
            dispatch(setUsers(res.data));
        });
    };
}

export function getUserProfile(data) {
    return dispatch => {
        return axios.post("api/User/user", data);
    };
}

export function deleteUser(id) {
    return dispatch => {
        return axios.delete(`${serverUrl}api/User/` + id)
            .then(res => {
                var userId = res.data;
                console.log("User id: ", userId);
                dispatch({ type: DELETE_USER, userId });
            })
    }
}
