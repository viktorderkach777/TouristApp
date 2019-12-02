import { createSlice } from 'redux-starter-kit';
import update from '../helpers/update'
import TourService from "../components/tours/tourService";

export const initialState = {
    list: {
        error: false,
        success: false,
        loading: false,
        filters: []
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
            //console.log("get list filter from server", data);
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
        },
        setChekedFilters: (state, action) => {
            let newState = state;
            const filterId = action.payload;
            console.log("FilterReducer-setChekedFilters-filterId:", filterId);
            console.log("FilterReducer-setChekedFilters-newstate:", newState );
            newState.list.filters.forEach((filter) => {
                console.log("filter name", filter.name);
                filter.children.forEach((element, index) => {
                    console.log("children name", element.value ,'id:', element.id );
                    if (element.id == filterId) {
                        console.log("chekedID", element.id );
                        element.isChecked = !element.isChecked;
                    }
                });
            });
            // newState = update.set(state, 'list.loading', false);
            // newState = update.set(newState, 'list.error', true);
            return newState;
        }


    }
});

export const getListFilters = () => {
    return (dispatch) => {
        dispatch(filters.actions.getFiltersStarted());

        TourService.getListFilters()
            .then((response) => {
                //console.log('--success list filter--', response.data);
                dispatch(filters.actions.getFiltersSuccess(response));
            })
            .catch(() => {
                //console.log('--failed--');
                dispatch(filters.actions.getFiltersFailed());
            });
    }
};

export const setChekedFilters = (filterId) => {
    return (dispatch) => {
        dispatch(filters.actions.setChekedFilters(filterId));
    }
}
