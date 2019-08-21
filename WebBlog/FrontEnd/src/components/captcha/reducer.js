import update from '../../helpers/update';
import CaptchaService from './captchaService';
import { createSlice } from 'redux-starter-kit';


const initialState = {
    key: {
        data: null,
        error: false,
        loading: false,
        success: false
    },
    image: {
        url: 'default-image.jpg'
    }
}



export const captchaReducer = createSlice({
    slice: 'captcha',
    initialState: initialState,
    reducers: {
        KeyPostStarted: state => {
            let newState = state;
            newState = update.set(state, 'key.loading', true);
            newState = update.set(newState, 'key.success', false);
            newState = update.set(newState, 'key.data', null);
            return newState;
        },
        KeyPostSuccess: (state, action) => {
            let newState = state;
            const data = action.payload.data;
            console.log("get key", data);
            newState = update.set(state, 'key.loading', false);
            newState = update.set(newState, 'key.success', true);
            newState = update.set(newState, 'key.data', data);
            return newState;
        },
        KeyPostFailed: state => {
            let newState = state;
            newState = update.set(state, 'key.loading', false);
            newState = update.set(newState, 'key.error', true);
            return newState;
        }
    }
});



export const createNewKey = () => {
    return (dispatch) => {
        dispatch(captchaReducer.actions.KeyPostStarted());

        CaptchaService.postNewKey()
            .then((response) => {
                console.log('--success create--', response.data);
                dispatch(captchaReducer.actions.KeyPostSuccess(response));
            })
            .catch(() => {
                console.log('--failed--');
                dispatch(captchaReducer.actions.KeyPostFailed());
            });
    }
};





// export const captchaReducer = (state = initialState, action) => {
//     let newState = state;

//     switch (action.type) {

//         case KEY_POST_STARTED: {
            
//             // const key = {
//             //     data: null,
//             //     success: false,
//             //     loading: true 
//             // };
//             // newState = {...state, key: {...state.key, ...key} };
//             //Object.assign()
//             newState = update.set(state, 'key.loading', true);
//             newState = update.set(newState, 'key.success', false);
//             newState = update.set(newState, 'key.data', null);
//             break;
//         }

//         default: {
//             return newState;
//         }
//     }

//     return newState;
// }

// export const createNewKey = () => {
//     return (dispatch) => {
//         dispatch(keyCaptchaActions.started());

//         CaptchaService.postNewKey()
//             .then((response) => {
//                 dispatch(keyCaptchaActions.success(response));
//             })
//             .catch(() => {
//                 dispatch(keyCaptchaActions.failed());
//             });
//     }
// }

// export const keyCaptchaActions = {
//     started: () => {
//         return {
//             type: KEY_POST_STARTED
//         }
//     },

//     success: (data) => {
//         return {
//             type: KEY_POST_SUCCESS,
//             payload: data
//         }
//     },

//     failed: (error) => {
//         return {
//             type: KEY_POST_FAILED
//         }
//     }
// }
