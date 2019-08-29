import { createSlice } from 'redux-starter-kit';
import update from '../../helpers/update'
import TourService from "./tourService";
export const initialState = {
    list: {
        data: [],
        error: false,
        success: false,
        loading: false
    }
};


export const tours = createSlice({
    slice: 'tours',
    initialState: initialState,
    reducers: {
        getToursStarted: state => {
            let newState = state;
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            return newState;
        },
        getToursSuccess: (state, action) => {
            let newState = state;
            const data = action.payload.data;
            console.log("get list", data);
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', data);
            return newState;
        },
        getToursFailed: state => {
            let newState = state;
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.error', true);
            return newState;
        }
    }
});

export const getListTours = () => {
    return (dispatch) => {
        dispatch(tours.actions.getToursStarted());

        TourService.getListTours()
            .then((response) => {
                console.log('--success create--', response.data);
                dispatch(tours.actions.getToursSuccess(response));
            })
            .catch(() => {
                console.log('--failed--');
                dispatch(tours.actions.getToursFailed());
            });
    }
};
