import { createSlice } from 'redux-starter-kit';
import update from '../helpers/update'
import CountryService from "../Services/AdminService";

export const initialState = {
    list: {
        data: [],
        error: false,
        success: false,
        loading: false,
    },
    delete: {
        error: false,
        loading: false,
        success: false
    },
    add: {
        error: false,
        loading: false,
        success: false
    },
    edit: {
        error: false,
        loading: false,
        success: false
    }

};

function compareIncrease(a, b) {
    if (a.label < b.label) {
        return -1;
    }
    if (a.label > b.label) {
        return 1;
    }
    return 0;
}

function compareDecrease(a, b) {
    if (a.label > b.label) {
        return -1;
    }
    if (a.label < b.label) {
        return 1;
    }
    return 0;
}


export const countries = createSlice({
    slice: 'Countries',
    initialState: initialState,
    reducers: {

        //------------------SORTING --------------------------------------
        sortCountries: (state, action) => {
            let newState = state;
            const typeSort = action.payload;
            let data=[];
            console.log('--typeSort--', typeSort);
            if (typeSort===true )
            {
                data = state.list.data.sort(compareIncrease);
            }
            else 
            if (typeSort===false )
            {
                data = state.list.data.sort(compareDecrease);
            }
            console.log('--data--', data);
            newState = update.set(state, 'list.data', data);
            return newState;
        },

        //------------------LIST COUNTRY --------------------------------------
        getCountriesStarted: state => {
            let newState = state;
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            return newState;
        },
        getCountriesSuccess: (state, action) => {
            let newState = state;
            const data = action.payload.data;
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', data);
            return newState;
        },
        getCountriesFailed: state => {
            let newState = state;
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.error', true);
            return newState;
        },

        //------------------DELETE COUNTRY --------------------------------------

        deleteCountryStarted: state => {
            let newState = state;
            newState = update.set(state, 'delete.loading', true);
            newState = update.set(newState, 'delete.success', false);
            return newState;
        },
        deleteCountrySuccess: (state, action) => {
            let newState = state;
            let data = state.list.data.filter(item => item.value !== action.payload.id);
            newState = update.set(state, 'delete.loading', false);
            newState = update.set(newState, 'delete.success', true);
            newState = update.set(newState, 'list.data', data);
            return newState;
        },
        deleteCountryFailed: state => {
            let newState = state;
            newState = update.set(state, 'delete.loading', false);
            newState = update.set(newState, 'delete.error', true);
            return newState;
        },

        //------------------CREATE COUNTRY --------------------------------------
        createCountryStarted: state => {
            let newState = state;
            newState = update.set(state, 'add.loading', true);
            newState = update.set(newState, 'add.success', false);
            return newState;
        },
        createCountrySuccess: (state, action) => {
            let newState = state;
            var country = {
                value: action.payload.id,
                label: action.payload.name
            };
            console.log('--country--', country);

            let data = state.list.data.concat(country);
            console.log('--data--', data);

            newState = update.set(state, 'add.loading', false);
            newState = update.set(newState, 'add.success', true);
            newState = update.set(newState, 'list.data', data);
            return newState;
        },
        createCountryFailed: state => {
            let newState = state;
            newState = update.set(state, 'add.loading', false);
            newState = update.set(newState, 'add.error', true);
            return newState;
        },

        //------------------EDIT COUNTRY --------------------------------------
        editCountryStarted: state => {
            let newState = state;
            newState = update.set(state, 'edit.loading', true);
            newState = update.set(newState, 'edit.success', false);
            return newState;
        },
        editCountrySuccess: (state, action) => {
            let newState = state;
            let data = state.list.data.map(item => {
                if (item.value === action.payload.value) item = action.payload;
                return item;
            });

            newState = update.set(state, 'edit.loading', false);
            newState = update.set(newState, 'edit.success', true);
            newState = update.set(newState, 'list.data', data);
            return newState;
        },
        editCountryFailed: state => {
            let newState = state;
            newState = update.set(state, 'edit.loading', false);
            newState = update.set(newState, 'edit.error', true);
            return newState;
        }
    }
});

export const getCountries = () => {
    return (dispatch) => {
        dispatch(countries.actions.getCountriesStarted());

        CountryService.getCountries()
            .then((response) => {
                console.log('--success get list--', response.data);
                dispatch(countries.actions.getCountriesSuccess(response));
            })
            .catch(() => {
                console.log('--failed get list--');
                dispatch(countries.actions.getCountriesFailed());
            });
    }
};


export const deleteCountry = (countryId) => {
    return (dispatch) => {
        dispatch(countries.actions.deleteCountryStarted());

        CountryService.deleteCountry(countryId)
            .then((response) => {
                console.log('--success delete--', response.data);
                var country_delete_Id = response.data;
                dispatch(countries.actions.deleteCountrySuccess(country_delete_Id));
            })
            .catch(() => {
                console.log('--failed delete--');
                dispatch(countries.actions.deleteCountryFailed());
            });
    }
}

export const editCountry = (Id, CountryModel) => {
    return (dispatch) => {
        dispatch(countries.actions.editCountryStarted());

        CountryService.editCountry(Id, CountryModel)
            .then((response) => {
                console.log('--success edit--', response.data);
                var countryId = response.data;
                dispatch(countries.actions.editCountrySuccess(countryId));
            })
            .catch(() => {
                console.log('--failed edit--');
                dispatch(countries.actions.editCountryFailed());
            });
    }
}

export const createCountry = (CountryModel) => {
    return (dispatch) => {
        dispatch(countries.actions.createCountryStarted());

        CountryService.addCountry(CountryModel)
            .then((response) => {
                console.log('--success create--', response);
                var country = response.data;
                dispatch(countries.actions.createCountrySuccess(country));
            })
            .catch(() => {
                console.log('--failed create--');
                dispatch(countries.actions.createCountryFailed());
            });
    }
}


export const sortCountries = (TypeSort) => {
    return (dispatch) => {
        dispatch(countries.actions.sortCountries(TypeSort));
    }
}