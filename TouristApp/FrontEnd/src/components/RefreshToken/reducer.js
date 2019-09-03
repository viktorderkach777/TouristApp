const initialState = {
    success: false,
    failed: false,
    loading: false
}

export const refreshReducer = (state = initialState, action) => {
    let newState = state;
    switch(action.type){
        case 'REFRESH_STARTED': {
            newState = {...initialState, loading: true };
            break;
        }
        case 'REFRESH_SUCCESS': {
            newState = {...state, success: true, loading: false };
            break;
        }
        case 'REFRESH_FAILED': {
            newState = {...state, failed: true, loading: false };
            break;
        }
        default: {
            return newState
        }
    };
    return newState;
}