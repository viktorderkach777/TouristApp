import { SET_USERS,DELETE_USER } from "../actions/types";

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


