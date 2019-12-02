import AdminService from '../../../../Services/AdminService'

export const FETCH_KURS_REQUEST = "kurs/FETCH_KURS_REQUEST";
export const FETCH_KURS_SUCCESS = "kurs/FETCH_KURS_SUCCESS";
export const FETCH_KURS_FAILURE = "kurs/FETCH_KURS_FAILURE";
export const SET_KURS_CURRENCY = "kurs/SET_KURS_CURRENCY";

const initialState = {
    kurs: [],
    loading: false,
    errors: {},
    currency: 'USD'
};

export const kursReducer = (state = initialState, action) => {    
    switch (action.type) {
        case FETCH_KURS_REQUEST:
            return {
                ...state,
                kurs: [],
                loading: true,
                errors: {}
            };
        case FETCH_KURS_SUCCESS:
            return {
                ...state,
                kurs: action.payload,
                loading: false,
                errors: {}
            };
        case FETCH_KURS_FAILURE:
            return {
                ...state,
                kurs: [],
                loading: false,
                errors: action.payload
            };
        case SET_KURS_CURRENCY:
            return {
                ...state,
                currency: action.payload
            };
        default:
            return state;
    }
};

export const setCurrency = (currency) => {    
    return (dispatch) => {        
        dispatch({
            type: SET_KURS_CURRENCY,
            payload: currency.label
        });
    }
}

export const kursGet = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_KURS_REQUEST });
        AdminService.getKurs()
            .then((response) => {
                console.log('(response)', response);
                if (response.statusText !== "OK") {
                    dispatch({
                        type: FETCH_KURS_FAILURE,
                        payload: `Could not fetch, received ${response.status}`
                    });
                    throw new Error(`Could not fetch, received ${response.status}`);
                }
                else {
                    dispatch({ type: FETCH_KURS_SUCCESS, payload: JSON.parse(response.data.answer) });
                }
            },
                // err => {                    
                //     console.log('Server problen in controler message', err.response.data);
                //     // dispatch({
                //     //     type: FETCH_KURS_FAILURE,
                //     //     payload: err.response.data
                //     // }
                //     // );
                // }
            )
            .catch(err => {
                console.log('Global Server problem in controler message', err);
                dispatch({
                    type: FETCH_KURS_FAILURE,
                    errors: err
                });
            });
    }
}