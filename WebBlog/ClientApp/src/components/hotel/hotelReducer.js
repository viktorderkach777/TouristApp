import { createSlice } from 'redux-starter-kit';
import update from '../../helpers/update'
import HotelService from "./hotelService";
export const initialState = {
    list: {
        data: [],
        error: false,
        success: false,
        loading: false
    }
};


export const hotel = createSlice({
    slice: 'hotel',
    initialState: initialState,
    reducers: {
        getHotelsStarted: state => {
            let newState = state;
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            return newState;
        },
        getHotelsSuccess: (state, action) => {
            let newState = state;
            const data = action.payload.data;
            console.log("get list", data);
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', data);
            return newState;
        },
        getHotelsFailed: state => {
            let newState = state;
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.error', true);
            return newState;
        }
    }
});

export const getListHotel = () => {
    return (dispatch) => {
        dispatch(hotel.actions.getHotelsStarted());

        HotelService.getListHotel()
            .then((response) => {
                console.log('--success create--', response.data);
                dispatch(hotel.actions.getHotelsSuccess(response));
            })
            .catch(() => {
                console.log('--failed--');
                dispatch(hotel.actions.getHotelsFailed());
            });
    }
};

