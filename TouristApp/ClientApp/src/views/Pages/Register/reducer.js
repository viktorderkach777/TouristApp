//import update from '../../../helpers/update';
import RegisterService from './registerService';
//import isEmpty from 'lodash/isEmpty';
import { push } from 'connected-react-router';

export const REGISTER_POST_STARTED = "register/REGISTER_POST_STARTED";
export const REGISTER_POST_SUCCESS = "register/REGISTER_POST_SUCCESS";
export const REGISTER_POST_FAILED = "register/REGISTER_POST_FAILED";
//export const REGISTER_SET_CURRENT_USER = "register/SET_CURRENT_USER";

const initialState = {
    //post: {
        loading: false,
        //success: false,
        //failed: false,
        errors: {}
    //}
}

export const registerReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {

        case REGISTER_POST_STARTED: {
            // newState = update.set(state, 'post.loading', true);
            // newState = update.set(newState, 'post.success', false);
            // newState = update.set(newState, 'post.errors', {});
            // newState = update.set(newState, 'post.failed', false);
            newState = {
                ...state,
                loading: true,
                errors: {}
            };
            break;
        }
        case REGISTER_POST_SUCCESS: {
            // newState = update.set(state, 'post.loading', false);
            // newState = update.set(newState, 'post.failed', false);
            // newState = update.set(newState, 'post.errors', {});
            // newState = update.set(newState, 'post.success', true);
            newState = {
                ...state,
                loading: false,
                errors: {}
            };
            break;
        }
        case REGISTER_POST_FAILED: {
            // newState = update.set(state, 'post.loading', false);
            // newState = update.set(newState, 'post.success', false);
            // newState = update.set(newState, 'post.errors', action.errors);
            // newState = update.set(newState, 'post.failed', true);
            newState = {
                ...state,
                loading: false,
                errors: action.errors
            };
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
        dispatch({ type: REGISTER_POST_STARTED });
        RegisterService.register(model)
            .then((response) => {
                dispatch({ type: REGISTER_POST_SUCCESS });
                dispatch(push('/login'));
            },
                err => {
                    //dispatch(registerActions.failed(err.response));
                    console.log('Server problen in controler message', err.response.data);
                    dispatch({
                        type: REGISTER_POST_FAILED,
                        errors: err.response.data
                    });
                })
            .catch(err => {
                //dispatch(registerActions.failed(err.response));
                console.log('Global Server problen in controler message', err);
                dispatch({
                    type: REGISTER_POST_FAILED,
                    errors: err.response.data
                });
            });
    }
}

// export const registerActions = {
//     started: () => {
//         return {
//             type: REGISTER_POST_STARTED
//         }
//     },

//     success: () => {
//         return {
//             type: REGISTER_POST_SUCCESS
//         }
//     },

//     failed: (response) => {
//         return {
//             type: REGISTER_POST_FAILED,
//             errors: response.data
//         }
//     }
// }
