import update from '../../../helpers/update';
import RegisterService from './registerService';
//import isEmpty from 'lodash/isEmpty';
import { push } from 'connected-react-router';

export const REGISTER_POST_STARTED = "register/REGISTER_POST_STARTED";
export const REGISTER_POST_SUCCESS = "register/REGISTER_POST_SUCCESS";
export const REGISTER_POST_FAILED = "register/REGISTER_POST_FAILED";
export const REGISTER_SET_CURRENT_USER = "register/SET_CURRENT_USER";

const initialState = {
    post: {
        loading: false,
        success: false,
        failed: false,
        errors: {}
    },
    // isAuthenticated: false,
    // user: {
    //   id: '',
    //   name: '',
    //   //image:'',
    //   roles: []
    // }
}

export const registerReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {

        case REGISTER_POST_STARTED: { 
            newState = update.set(state, 'post.loading', true);
            newState = update.set(newState, 'post.success', false);
            newState = update.set(newState, 'post.errors', {});
            newState = update.set(newState, 'post.failed', false);
            break;
        }
        // case REGISTER_SET_CURRENT_USER: {
        //     return {
        //         ...state,
        //         isAuthenticated: !isEmpty(action.user),
        //         user: action.user
        //     };
        // }
        case REGISTER_POST_SUCCESS: {
            newState = update.set(state, 'post.loading', false);
            newState = update.set(newState, 'post.failed', false);
            newState = update.set(newState, 'post.errors', {});
            newState = update.set(newState, 'post.success', true);
            break;
        }
        case REGISTER_POST_FAILED: {
            newState = update.set(state, 'post.loading', false);
            newState = update.set(newState, 'post.success', false);
            newState = update.set(newState, 'post.errors', action.errors);
            newState = update.set(newState, 'post.failed', true);
            break;
        }
        default: {
            return newState;
        }
    }

    return newState;
}

export const registerPost = (model) => {
    return (dispatch) => {
        dispatch(registerActions.started());
        RegisterService.register(model)
            .then((response) => {    
                dispatch(registerActions.success());
                dispatch(push('/tours'));
                //registerByJWT(response.data, dispatch);   
                console.log('register');             
                
            }, err=> { throw err; })
            .catch(err=> {
                dispatch(registerActions.failed(err.response));
            });
    }
}

export const registerActions = {
    started: () => {
        return {
            type: REGISTER_POST_STARTED
        }
    },

    success: () => {
        return {
            type: REGISTER_POST_SUCCESS
        }
    },

    failed: (response) => {
        return {
            type: REGISTER_POST_FAILED,
            errors: response.data
        }
    },

    // setCurrentUser: (user) => {
    //     return {
    //         type: REGISTER_SET_CURRENT_USER,
    //         user
    //     }
    // }
}
