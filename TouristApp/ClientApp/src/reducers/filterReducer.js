import { createSlice } from 'redux-starter-kit';
import update from '../helpers/update'
import TourService from "../components/tours/tourService";

export const initialState = {
    list: {
        error: false,
        success: false,
        loading: false,
        filters: [
            // {
            //     name: 'Країни',
            //     id: '1',
            //     children: [
            //         { value: 'Іспанія', id: '1', isChecked: false },
            //         { value: 'Франція', id: '2', isChecked: false },
            //         { value: 'Єгипет', id: '3', isChecked: false },
            //         { value: 'Кіпр', id: '4', isChecked: false }
            //     ]
            // },
            // {
            //     name: 'Місто відправлення',
            //     id: '2',
            //     children: [
            //         { value: 'Київ', id: '5', isChecked: false },
            //         { value: 'Львів', id: '6', isChecked: false },
            //         { value: 'Одесса', id: '7', isChecked: false }
            //     ]
            // },
            // {
            //     name: 'Гроші',
            //     id: '3',
            //     children: [
            //         { value: 'UA', id: '8', isChecked: false },
            //         { value: 'RUS', id: '9', isChecked: false },
            //         { value: 'EUR', id: '10', isChecked: false }
            //     ]
            // }
        ]
    }

};


export const filters = createSlice({
    slice: 'filters',
    initialState: initialState,
    reducers: {

        getFiltersStarted: state => {
            let newState = state;
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            return newState;
        },
        getFiltersSuccess: (state, action) => {
            let newState = state;
            const data = action.payload.data;
            console.log("get list filter from server", data);
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.filters', data);

            return newState;
        },
        getFiltersFailed: state => {
            let newState = state;
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.error', true);
            return newState;
        }
    }
});

export const getListFilters = () => {
    return (dispatch) => {
        dispatch(filters.actions.getFiltersStarted());

        TourService.getListFilters()
            .then((response) => {
                console.log('--success list filter--', response.data);
                dispatch(filters.actions.getFiltersSuccess(response));
            })
            .catch(() => {
                console.log('--failed--');
                dispatch(filters.actions.getFiltersFailed());
            });
    }
};


